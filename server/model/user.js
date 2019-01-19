import mongoose from 'mongoose';
import customErrorHandler from './customErrorHandler';

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required.']
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'password is required.']
  }
});

schema.post('save', customErrorHandler);
const model = mongoose.model('user', schema);

export default model;
