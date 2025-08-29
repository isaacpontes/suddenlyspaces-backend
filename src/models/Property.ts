import { Schema } from 'mongoose';
import { mongo } from '../database';

const propertySchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  leaseType: { type: String, required: true, enum: ['coworking', 'residential', 'short-term'] },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Landlord',
    required: true
  },
});

export const Property = mongo.model('Property', propertySchema);
