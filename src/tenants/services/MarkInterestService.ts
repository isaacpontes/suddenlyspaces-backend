import { Property } from "../../models/Property";
import { Tenant } from "../../models/Tenant";
import { HttpError } from "../../shared/errors/HttpError";
import mongoose from "mongoose";

export const MarkInterestService = {
  // Marks a given property in the database as being of interest for a given tenant
  async add(propertyId: string, tenantId: string) {
    const property = await Property.findOne({ _id: propertyId }).lean();
    if (!property) throw new HttpError(404, "Property not found");

    const tenant = await Tenant.findById(tenantId, { email: false, password: false });
    if (!tenant) throw new HttpError(404, "Tenant not found");

    const propertyIdAsObjectId = new mongoose.Types.ObjectId(propertyId);
    if (tenant.interests.includes(propertyIdAsObjectId)) {
      throw new HttpError(409, "You already added this property to your interests list.");
    }

    tenant.interests.push(propertyIdAsObjectId);
    await tenant.save();

    return tenant;
  },
};
