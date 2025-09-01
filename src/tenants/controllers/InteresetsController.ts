import { Request, Response } from "express";
import { MarkInterestService } from "../services/MarkInterestService";
import { HttpError } from "../../shared/errors/HttpError";

export const InterestsController = {
  // POST /interests/:id
  async addInterest(req: Request, res: Response) {
    const propertyId = req.params.id;
    if (!propertyId) throw new HttpError(400, "Missing property ID");

    const tenantId = req.tenantId;
    if (!tenantId) throw new HttpError(401, "Invalid or expired token.");

    const result = await MarkInterestService.add(propertyId, tenantId);

    res.json(result);
  },
};
