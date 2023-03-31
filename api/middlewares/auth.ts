import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) throw new Error('Not authorized to access this route!');
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id)

    next();
  } catch (err) {
    throw new Error('Not authorized to access this route!');
  }
}

export default protectedRoute;
