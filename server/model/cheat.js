import { Schema, model } from 'mongoose';
import customErrorHandler from './customErrorHandler';

const schema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  },
  description: {
    type: String,
    required: true
  },
  line: {
    type: String,
    required: true
  }
});

schema.post('save', customErrorHandler);
export default model('cheat', schema);
