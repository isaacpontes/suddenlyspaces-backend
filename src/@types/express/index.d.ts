import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      landlordId?: string;
      tenantId?: string;
    }
  }
}
