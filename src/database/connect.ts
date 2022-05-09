import mongoose from 'mongoose';
import { DbConnectionError } from '../exceptions/error';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sounak08:Sounak08*@cluster0-qldch.mongodb.net/anyfin?retryWrites=true&w=majority');

    console.log('Mongo Connected...');
  } catch (err) {
    throw new DbConnectionError('Db connect failed');
  }
};

export default connectDB;
