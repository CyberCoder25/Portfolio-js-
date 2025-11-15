import nodemailer from 'nodemailer';
import validator from 'validator';
import { logger } from '../utils/logger.js';
import { AppError, asyncHandler } from '../utils/errors.js';

// validate contact form input
const validateInput = (name, email, message) => {
  const errors = [];

  // validate name field
  if (!name || typeof name !== 'string') {
    errors.push('name is required');
  } else if (name.trim().length < 2 || name.trim().length > 100) {
    errors.push('name must be between 2 and 100 characters');
  } else if (!/^[a-zA-Z\s\u10A0-\u10FF]+$/.test(name)) {
    errors.push('name can only contain letters and spaces');
  }

  // validate email field
  if (!email || !validator.isEmail(email)) {
    errors.push('valid email is required');
  } else if (email.length > 254) {
    errors.push('email is too long');
  }

  // validate message field
  if (!message || typeof message !== 'string') {
    errors.push('message is required');
  } else if (message.trim().length < 10 || message.trim().length > 1000) {
    errors.push('message must be between 10 and 1000 characters');
  }

  return errors;
};

// sanitize html special characters from user input
const sanitizeHTML = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// initialize email transporter connection
let transporter = null;

// get or create email transporter instance
const getTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new AppError('email service is not configured', 500);
  }

  // reuse existing connection if available
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2'
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000
  });

  return transporter;
};

export const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const requestId = req.id;

  // log contact form submission attempt
  logger.debug('processing contact form submission', {
    requestId,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  // validate input data
  const validationErrors = validateInput(name, email, message);
  if (validationErrors.length > 0) {
    logger.warn('contact form validation failed', {
      requestId,
      errors: validationErrors,
      email: email
    });
    return res.status(400).json({
      success: false,
      message: 'validation failed',
      errors: validationErrors
    });
  }

  // sanitize and normalize user input
  const sanitizedName = sanitizeHTML(name.trim());
  const sanitizedEmail = validator.normalizeEmail(email.trim().toLowerCase());
  const sanitizedMessage = sanitizeHTML(message.trim());

  try {
    // verify email service configuration
    const emailTransporter = getTransporter();
    await emailTransporter.verify();

    // prepare email content
    const mailOptions = {
      from: {
        name: 'portfolio contact form',
        address: process.env.SMTP_USER
      },
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
      replyTo: sanitizedEmail,
      subject: `new portfolio contact: ${sanitizedName}`,
      text: `name: ${sanitizedName}\nemail: ${sanitizedEmail}\n\nmessage:\n${sanitizedMessage}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 0; text-align: center;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-collapse: collapse;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #007a5e, #0095c8); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px;">new contact form submission</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
                            <strong style="color: #007a5e;">name:</strong>
                            <p style="margin: 5px 0 0 0; color: #333333;">${sanitizedName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
                            <strong style="color: #007a5e;">email:</strong>
                            <p style="margin: 5px 0 0 0;">
                              <a href="mailto:${sanitizedEmail}" style="color: #0095c8; text-decoration: none;">${sanitizedEmail}</a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 20px 0;">
                            <strong style="color: #007a5e;">message:</strong>
                            <div style="margin: 10px 0 0 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; color: #333333; line-height: 1.6;">
                              ${sanitizedMessage.replace(/\n/g, '<br>')}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px; background-color: #f9f9f9; text-align: center; border-radius: 0 0 10px 10px;">
                      <p style="margin: 0; color: #888888; font-size: 12px;">
                        this email was sent from your portfolio contact form at tamta.ge<br>
                        received: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Tbilisi' })} (tbilisi time)
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    // send email through smtp service
    const info = await emailTransporter.sendMail(mailOptions);

    logger.info('contact email sent successfully', {
      requestId,
      messageId: info.messageId,
      recipient: sanitizedEmail
    });

    res.status(200).json({
      success: true,
      message: 'message sent successfully'
    });

  } catch (error) {
    // log email sending error
    logger.error('contact email sending failed', {
      requestId,
      error: error.message,
      code: error.code,
      email: sanitizedEmail
    });

    // handle authentication errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'email service authentication failed'
      });
    }

    // handle connection errors
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'could not connect to email server'
      });
    }

    res.status(500).json({
      success: false,
      message: 'failed to send message. please try again later.'
    });
  }
});