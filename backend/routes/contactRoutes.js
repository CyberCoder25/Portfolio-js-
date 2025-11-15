import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';
import { csrfMiddleware } from '../utils/csrf.js';

const router = express.Router();

// get csrf token for form validation
router.get('/csrf-token', csrfMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    csrfToken: req.csrfToken()
  });
});

// handle contact form submission
router.post('/contact', sendContactEmail);

export default router;