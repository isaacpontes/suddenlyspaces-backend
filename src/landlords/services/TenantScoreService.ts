import { Tenant } from "../../models/Tenant";
import { HttpError } from "../../shared/errors/HttpError";

export const TenantScoreService = {
  /**
   * Calculate the tenant risk score
   *  */
  async calculateRiskScore(tenantId: string) {
    const tenant = await Tenant.findOne(
      { _id: tenantId },
      { password: false }
    ).lean();
    
    if (!tenant) throw new HttpError(404, "Tenant not found");

    return {
      ...tenant,
      riskScore: Math.floor(Math.random() * 100)
    };
  },
};
