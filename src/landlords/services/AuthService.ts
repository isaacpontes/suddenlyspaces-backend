import { Landlord } from "../../models/Landlord";
import { HttpError } from "../../shared/errors/HttpError";
import { JwtService } from "../../shared/services/JwtService";
import bcrypt from "bcrypt"

function toPublicLandlord(landlord: any) {
  return {
    id: landlord.id?.toString?.() ?? landlord._id?.toString?.(),
    name: landlord.name,
    email: landlord.email,
  } as const;
}

export const AuthService = {
  async login(input: { email: string, password: string }) {
    const { email, password } = input;

    const landlord = await Landlord.findOne({ email });
    if (!landlord) throw new HttpError(401, 'Invalid credentials');

    const ok = await bcrypt.compare(password, landlord.password);
    if (!ok) throw new HttpError(401, 'Invalid credentials');

    const accessToken = JwtService.signAccessToken(landlord.id, landlord.email);

    return {
      landlord: toPublicLandlord(landlord),
      token: accessToken,
    };
  },

  async register(input: { name: string, email: string, password: string }) {
    const { name, email, password } = input;

    const existing = await Landlord.findOne({ email }).lean();
    if (existing) throw new HttpError(409, 'Email already in use');

    const landlord = new Landlord({ name, email, password });
    await landlord.save();

    const accessToken = JwtService.signAccessToken(landlord.id, landlord.email);

    return {
      landlord: toPublicLandlord(landlord),
      token: accessToken,
    };
  },

  async me(token: string) {
    const payload = JwtService.verifyAccessToken(token);
    if (!payload) throw new HttpError(401, 'Invalid or expired token');

    const landlord = await Landlord.findById(payload.sub).lean();
    if (!landlord) throw new HttpError(404, 'Landlord not found');
    
    return { landlord: toPublicLandlord(landlord) };
  }
};
