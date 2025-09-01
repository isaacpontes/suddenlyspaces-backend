import { Request, Response } from "express";
import { z } from "zod";
import { PropertyService } from "../services/PropertyService";

const ListPropertiesSchema = z.object({
  title: z.string().optional(),
  ownerId: z.string().optional(),
  location: z.string().optional(),
  leaseType: z.enum(["all", "coworking", "residential", "short-term"]).optional(),
  priceMin: z.string().optional(),
  priceMax: z.string().optional(),
  page: z.string().min(1).optional(),
  limit: z.string().min(1).optional(),
});

export const PropertyController = {
  // GET /landlords/properties
  async list(req: Request, res: Response) {
    const parsed = ListPropertiesSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ errors: z.flattenError(parsed.error) });
    }

    const { title, ownerId, location, leaseType, priceMin, priceMax, page, limit } = parsed.data;

    const filters = {
      title,
      ownerId,
      location,
      leaseType: leaseType !== "all" ? leaseType : undefined,
      priceRange: priceMin || priceMax ? {} : undefined,
      page: Number(page),
      limit: Number(limit),
    };

    if (priceMin) filters.priceRange = { min: Number(priceMin) };
    if (priceMax) filters.priceRange = { max: Number(priceMax) };

    const result = await PropertyService.list(filters);
    res.json(result);
  },

  // GET /properties/:id
  async getById(req: Request, res: Response) {
    const propertyId = req.params.id;

    const result = await PropertyService.getById(propertyId);
    res.json(result);
  },
};
