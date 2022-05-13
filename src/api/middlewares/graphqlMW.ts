/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { getGraphQLRateLimiter } from 'graphql-rate-limit';
import { RateLimitExceedError, UnAuthorized } from '../../exceptions/error';

const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id });

const verifyTokenMW = {
  Query: {
    getCountries: async (resolve, parent, args, context, info) => {
      const authorizationHeaader = context.req.headers.authorization;
      const { SECRET } = process.env;
      if (authorizationHeaader) {
        const token = authorizationHeaader.split(' ')[1]; // Bearer <token>
        try {
          const result = jwt.verify(token, String(SECRET));
          // save current user data in res.locals
          context.res.locals.user = result;
          const res = await resolve(parent, args, context, info);
          return res;
        } catch (err) {
          // Throw an error just in case anything goes wrong with verification
          throw new UnAuthorized('Authentication error. Token invalid or has expired.');
        }
      }
    },
    getCurrencyValues: async (resolve, parent, args, context, info) => {
      const authorizationHeaader = context.req.headers.authorization;
      const { SECRET } = process.env;
      if (authorizationHeaader) {
        const token = authorizationHeaader.split(' ')[1]; // Bearer <token>
        try {
          const result = jwt.verify(token, String(SECRET));
          // save current user data in res.locals
          context.res.locals.user = result;
          const res = await resolve(parent, args, context, info);
          return res;
        } catch (err) {
          // Throw an error just in case anything goes wrong with verification
          throw new UnAuthorized('Authentication error. Token invalid or has expired.');
        }
      }
    },
  },
  Mutation: {
    createUser: async (resolve, parent, args, context, info) => {
      const errorMessage = await rateLimiter(
        {
          parent, args, context, info,
        },
        { max: 30, window: '1m' },
      );
      if (errorMessage) { throw new RateLimitExceedError('You exceeded 30 requests per minute limit!'); }
      const res = await resolve(parent, args, context, info);
      return res;
    },
  },
};

export default verifyTokenMW;
