import mongoose from 'mongoose';
import { MONGODB_URL } from './config/environment';

export const mongo = mongoose.createConnection(MONGODB_URL);
