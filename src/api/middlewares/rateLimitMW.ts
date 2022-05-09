import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Too many accounts created from this IP, please try again after an hour',
});
