import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/AuthService';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be at most 32 characters'),
});

const LoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const AuthController = {
  // POST /landlords/register
  async register(req: Request, res: Response) {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: z.treeifyError(parsed.error) });
    }

    const result = await AuthService.register(parsed.data);

    res.status(201).json(result);
  },

  // POST /landlords/login
  async login(req: Request, res: Response) {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: z.treeifyError(parsed.error) });
    }

    const result = await AuthService.login(parsed.data);

    res.status(200).json(result);
  },

  // GET /landlords/me
  async me(req: Request, res: Response) {
    const header = req.header('Authorization');
    const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
    if (!token) return res.status(401).json({ message: 'Missing Authorization header' });

    const result = await AuthService.me(token);
    res.json(result);
  }
};
