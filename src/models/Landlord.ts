import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { mongo } from '../database';

const landlordSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

landlordSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const Landlord = mongo.model('Landlord', landlordSchema);
