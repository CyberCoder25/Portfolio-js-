import crypto from 'crypto';

// store active csrf tokens with expiration
const csrfTokens = new Map();

// generate a new csrf token with expiration
const generateToken = (identifier) => {
  const token = crypto.randomBytes(32).toString('hex');
  csrfTokens.set(token, { identifier, createdAt: Date.now() });
  
  // auto-remove token after 30 minutes
  setTimeout(() => {
    csrfTokens.delete(token);
  }, 1000 * 60 * 30);

  return token;
};

// verify csrf token validity
const verifyToken = (token, identifier) => {
  if (!token || !identifier) return false;
  
  const stored = csrfTokens.get(token);
  if (!stored) return false;
  
  const isValid = stored.identifier === identifier;
  if (isValid) {
    csrfTokens.delete(token);
  }
  
  return isValid;
};

// middleware to generate csrf token on get requests
export const csrfMiddleware = (req, res, next) => {
  if (req.method === 'GET') {
    const identifier = req.ip || 'unknown';
    const token = generateToken(identifier);
    res.locals.csrfToken = token;
    req.csrfToken = () => token;
  }
  next();
};

// middleware to verify csrf token on post/put/delete requests
export const verifyCsrfToken = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const token = req.body.csrfToken || req.headers['x-csrf-token'];
    const identifier = req.ip || 'unknown';

    if (!verifyToken(token, identifier)) {
      return res.status(403).json({
        success: false,
        error: 'csrf token validation failed'
      });
    }
  }
  next();
};

export default { csrfMiddleware, verifyCsrfToken, generateToken, verifyToken };
