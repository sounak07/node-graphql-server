import { Request, Response } from 'express';

export default (req: Request, res: Response, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  next();
};
