import { Request, Response } from 'express';
import {
  DbConnectionError, UnAuthorized, ValidationError,
} from '../../exceptions/error';

export default (err: any, req: Request, res: Response, next: any) => {
  console.log(err.message);
  if (err instanceof ValidationError) res.status(400).json({ error: err.message });
  else if (err instanceof UnAuthorized) res.status(401).json({ error: err.message });
  else if (err instanceof DbConnectionError) res.status(500).json({ error: err.message });
  else res.status(500).json({ error: 'Internal Server Error' });
  next();
};
