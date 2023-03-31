import { Request, Response, NextFunction } from 'express';

const reqReceivedLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Received request from client!`);
  next();
};

export default reqReceivedLogger;
