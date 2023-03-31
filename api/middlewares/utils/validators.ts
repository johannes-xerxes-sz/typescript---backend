import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
  user: {
    admin: boolean;
  };
}

const adminValidator = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(403).setHeader('Content-Type', 'application/json').json({
      success: false,
      msg: 'Unauthorized to access this resource!',
    });
  }
};

const userValidator = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    if (
      !req.body.userName ||
      !req.body.age ||
      !req.body.gender ||
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.address
    ) {
      res.status(400).setHeader('Content-Type', 'text/plain').end('Missing Required Fields');
    } else {
      next();
    }
  } else {
    res.end(`Request for path: ${req.protocol} and method: ${req.method} is missing payload`);
  }
};

export { adminValidator, userValidator };
