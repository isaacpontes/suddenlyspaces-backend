import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../shared/services/JwtService";
import { HttpError } from "../../shared/errors/HttpError";

export async function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.header("Authorization");
    if (!header?.startsWith("Bearer ")) throw new HttpError(401, "Missing or invalid Authorization header");

    const token = header.slice("Bearer ".length);
    const payload = JwtService.verifyAccessToken(token);
    if (!payload) throw new HttpError(401, "Invalid or expired token");

    req.tenantId = payload.sub;

    next();
  } catch (err: any) {
    if (err instanceof HttpError) throw err;
    return res.status(500).json({ message: "Internal server error" });
  }
}
