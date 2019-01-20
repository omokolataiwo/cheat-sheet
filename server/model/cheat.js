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
    required: [true, 'Description is required']
  },
  line: {
    type: String,
    required: [true, 'Cheat command line is required']
  }
});

schema.post('save', customErrorHandler);
export default model('cheat', schema);
