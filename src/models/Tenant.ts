import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { mongo } from '../database';

const tenantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    }
  ]
});

tenantSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const Tenant = mongo.model('Tenant', tenantSchema);
