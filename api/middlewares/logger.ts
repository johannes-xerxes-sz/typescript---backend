import { RequestHandler } from 'express';

const logger: RequestHandler = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

export default logger;
