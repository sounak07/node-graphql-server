const mongoose = require('mongoose');

// schema maps to a collection
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: 'String',
    required: true,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
