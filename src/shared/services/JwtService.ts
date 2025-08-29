import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../config/environment";

export interface JwtPayload {
  sub: string;
  email: string;
}

export const JwtService = {
  signAccessToken(id: string, email: string): string {
    const payload: JwtPayload = { sub: id, email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as StringValue });
  },

  verifyAccessToken(token: string): JwtPayload | false {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
      return false;
    }
  }
};
