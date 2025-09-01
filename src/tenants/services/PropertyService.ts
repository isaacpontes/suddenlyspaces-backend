import { Property } from "../../models/Property";
import { HttpError } from "../../shared/errors/HttpError";

export const PropertyService = {
  // Get properties in the database
  async list(
    filters?: {
      title?: string;
      location?: string;
      priceRange?: { min?: number; max?: number };
      leaseType?: "coworking" | "residential" | "short-term";
      ownerId?: string,
      page?: number;
      limit?: number;
    }
  ) {
    const query: any = {};

    if (filters?.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }

    if (filters?.location) {
      query.location = { $regex: filters.location, $options: "i" };
    }

    if (filters?.leaseType) {
      query.leaseType = filters.leaseType;
    }

    if (filters?.ownerId) {
      query.owner = filters.ownerId;
    }

    if (filters?.priceRange) {
      const { min, max } = filters.priceRange;
      query.rentAmount = {};
      if (typeof min === "number") query.rentAmount.$gte = min;
      if (typeof max === "number") query.rentAmount.$lte = max;
      // Remove empty object if no min/max specified
      if (Object.keys(query.rentAmount).length === 0) delete query.rentAmount;
    }

    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const limit = filters?.limit && filters.limit > 0 ? filters.limit : 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find(query).skip(skip).limit(limit).lean();
    const total = await Property.countDocuments(query);

    return {
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Get a specific property in the database
  async getById(propertyId: string) {
    const property = await Property.findOne({ _id: propertyId }).lean();
    if (!property) throw new HttpError(404, "Property not found");
    return { property };
  },
};
