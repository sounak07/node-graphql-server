/* eslint-disable import/prefer-default-export */
import { Request, RequestHandler, Response } from 'express';
import { map } from 'lodash';
import asyncWrap from '../../utils/asyncwrap';
import verifyTokenMW from '../middlewares/verifyTokenMW';

const countryController: RequestHandler = async (req: Request, res: Response) => {
  res.status(201).json({
    data: 'ss',
  });
};

const middlewares = [
  verifyTokenMW,
  countryController,
];

export const countryFlow = [...map(middlewares, (mw: RequestHandler) => asyncWrap(mw))];
