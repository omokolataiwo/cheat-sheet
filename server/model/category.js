import { Schema, model } from 'mongoose';
import customErrorHandler from './customErrorHandler';

const schema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Category title is required']
  },
  cheats: [{ type: Schema.Types.ObjectId, ref: 'cheat' }]
});

schema.post('save', customErrorHandler);
export default model('category', schema);
