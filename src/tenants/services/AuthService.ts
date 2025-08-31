import { Tenant } from "../../models/Tenant";
import { HttpError } from "../../shared/errors/HttpError";
import { JwtService } from "../../shared/services/JwtService";
import bcrypt from "bcrypt"

function toPublicTenant(tenant: any) {
  return {
    id: tenant.id?.toString?.() ?? tenant._id?.toString?.(),
    name: tenant.name,
    email: tenant.email,
    role: 'tenant'
  } as const;
}

export const AuthService = {
  async login(input: { email: string, password: string }) {
    const { email, password } = input;

    const tenant = await Tenant.findOne({ email });
    if (!tenant) throw new HttpError(401, 'Invalid credentials');

    const ok = await bcrypt.compare(password, tenant.password);
    if (!ok) throw new HttpError(401, 'Invalid credentials');

    const accessToken = JwtService.signAccessToken(tenant.id, tenant.email);

    return {
      tenant: toPublicTenant(tenant),
      token: accessToken,
    };
  },

  async register(input: { name: string, email: string, password: string }) {
    const { name, email, password } = input;

    const existing = await Tenant.findOne({ email }).lean();
    if (existing) throw new HttpError(409, 'Email already in use');

    const tenant = new Tenant({ name, email, password });
    await tenant.save();

    const accessToken = JwtService.signAccessToken(tenant.id, tenant.email);

    return {
      tenant: toPublicTenant(tenant),
      token: accessToken,
    };
  },

  async me(token: string) {
    const payload = JwtService.verifyAccessToken(token);
    if (!payload) throw new HttpError(401, 'Invalid or expired token');

    const tenant = await Tenant.findById(payload.sub).lean();
    if (!tenant) throw new HttpError(404, 'Tenant not found');
    
    return { tenant: toPublicTenant(tenant) };
  }
};
