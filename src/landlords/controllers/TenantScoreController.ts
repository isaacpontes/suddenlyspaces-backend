import { Request, Response } from "express";
import { TenantScoreService } from "../services/TenantScoreService";

export const TenantScoreController = {
  // GET /landlords/tenants/:id/score
  async riskScore(req: Request, res: Response) {
    const tenantId = req.params.id;
    const result = await TenantScoreService.calculateRiskScore(tenantId);
    res.json(result);
  },
};
