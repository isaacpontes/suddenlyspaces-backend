import dotenv from 'dotenv';
import envVar from 'env-var';

dotenv.config();

export const PORT = envVar.get('PORT').default(3000).asPortNumber();

export const MONGODB_URL = envVar.get('MONGODB_URL').required().asString();

export const JWT_SECRET = envVar.get('JWT_SECRET').required().asString();
export const JWT_EXPIRES_IN = envVar.get('JWT_EXPIRES_IN').required().asString();
