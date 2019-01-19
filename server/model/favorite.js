import { Schema, model } from 'mongoose';
import customErrorHandler from './customErrorHandler';

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'UserId is required.'],
    ref: 'user'
  },
  cheatId: {
    type: Schema.Types.ObjectId,
    required: [true, 'CheatId is required.'],
    ref: 'cheat'
  }
});

schema.post('save', customErrorHandler);

export default model('favorite', schema);
