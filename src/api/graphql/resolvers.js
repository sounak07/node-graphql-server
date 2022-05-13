import axios from 'axios';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createRateLimitRule } from 'graphql-rate-limit';
import User from '../../database/models/user';
import { UnAuthorized, ValidationError } from '../../exceptions/error';

const API_ENDPOINTS = {
  COUNTRIES: 'https://restcountries.com/v3.1/name/',
  EXCHANGE_API: 'https://api.apilayer.com/fixer/latest?base=SEK',
};

const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const resolvers = {
  Query: {
    hello: () => 'Hello',
    getCountries: async (parent, { queryName }) => {
      const countries = await axios.get(
        `${API_ENDPOINTS.COUNTRIES}${queryName}`,
      );

      return countries.data.map(
        ({
          name: { official },
          population,
          currencies,
        }) => ({
          name: official,
          population,
          currencies: Object.keys(currencies),
        }),
      );
    },
    getCurrencyValues: async (parent, { sekValue, Countries }) => {
      const res = await axios.get(API_ENDPOINTS.EXCHANGE_API, { headers: { apikey: 'GUJCGFRVSnpcd1PIdoPBbshSTWzjjoVk' } });
      let currencyList = [];
      if (res.data && res.data.rates) {
        currencyList = Object.keys(res.data.rates);
      }

      const performExchange = (countryCurrency) => {
        if (currencyList.indexOf(countryCurrency) > -1) {
          return res.data.rates[countryCurrency];
        }
        return -1;
      };

      const results = Countries.reduce((final, country) => {
        country.currencies.forEach((curr) => {
          final.push({
            currency: curr,
            exchangeRates: performExchange(curr) * sekValue,
          });
        });
        return final;
      }, []);

      return results;
    },
  },

  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { user: { email, password } } = args;
      // const errorMessage = await rateLimiter(
      //   {
      //     parent, args, context, info,
      //   },
      //   { max: 5, window: '10s' },
      // );
      // console.log(errorMessage);
      // if (errorMessage) throw new Error('here');

      if (!email || !password) {
        throw new ValidationError('email and password required');
      }

      if (!email.match(pattern)) {
        throw new ValidationError('email is not valid');
      }

      const user = await User.findOne({ email });

      const { SECRET } = process.env;

      if (user) {
        const passMatch = await bcryptjs.compare(password, user.password);
        if (passMatch) {
          const payLoad = {
            email: user.email,
          };

          const token = await jwt.sign(payLoad, SECRET, { expiresIn: 3600 });
          return {
            data: `Bearer ${token}`,
          };
        }
        throw new UnAuthorized('Incorrect password');
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
        return {
          data: hashedUser.email,
        };
      }
    },
  },
};

export default resolvers;
