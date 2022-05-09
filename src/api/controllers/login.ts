/* eslint-disable import/prefer-default-export */
import { Request, RequestHandler, Response } from 'express';
import { map } from 'lodash';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncWrap from '../../utils/asyncwrap';
import User from '../../database/models/user';
import { UnAuthorized, ValidationError } from '../../exceptions/error';

const loginController: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('email and password required');
  }

  // TODO : use regex to verify email
  // TODO: fetch secret string from env

  const user = await User.findOne({ email });

  if (user) {
    const passMatch = await bcryptjs.compare(password, user.password);
    if (passMatch) {
      const payLoad = {
        email: user.email,
      };

      const token = await jwt.sign(payLoad, 'some-secret', { expiresIn: 3600 });
      res.json({
        success: true,
        token: `Bearer ${token}`,
      });
    } else {
      throw new UnAuthorized('Incorrect password');
    }
  } else {
    const newUser = new User({
      email,
      password,
    });
      // generate salt to hash password
    const salt = await bcryptjs.genSalt(10);
    // now we set user password to hashed password
    const hashedPass = await bcryptjs.hash(newUser.password, salt);
    newUser.password = hashedPass;
    const hashedUser = await newUser.save();
    res.status(201).json({
      data: hashedUser.email,
    });
  }
};

const middlewares = [
  loginController,
];

export const loginFlow = [...map(middlewares, (mw: RequestHandler) => asyncWrap(mw))];
