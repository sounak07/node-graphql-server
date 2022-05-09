import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnAuthorized } from '../../exceptions/error';

export default (req: Request, res: Response, next: any) => {
  const authorizationHeaader = req.headers.authorization;
  if (authorizationHeaader) {
    const token = authorizationHeaader.split(' ')[1]; // Bearer <token>
    try {
      const result = jwt.verify(token, 'some-secret');
      // save current user data in res.locals
      res.locals.user = result;
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new UnAuthorized('Authentication error. Token invalid or has expired.');
    }
  } else {
    throw new UnAuthorized('Authentication error. Token required.');
  }
  next();
};
