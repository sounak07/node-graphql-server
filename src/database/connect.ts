import mongoose from 'mongoose';
import { DbConnectionError } from '../exceptions/error';

const connectDB = async () => {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;

  try {
    await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);

    console.log('Mongo Connected...');
  } catch (err) {
    throw new DbConnectionError(`Db connect failed: ${err}`);
  }
};

export default connectDB;
