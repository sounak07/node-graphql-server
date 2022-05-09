/* eslint-disable import/prefer-default-export */
import { Request, RequestHandler, Response } from 'express';
import { map } from 'lodash';
import asyncWrap from '../../utils/asyncwrap';

const countryController: RequestHandler = async (req: Request, res: Response) => {
  res.status(201).json({
    data: 'ss',
  });
};

const middlewares = [
  countryController,
];

export const countryFlow = [...map(middlewares, (mw: RequestHandler) => asyncWrap(mw))];
