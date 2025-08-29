import { Request, Response } from "express";
import { z } from "zod";
import { PropertyService } from "../services/PropertyService";
import { HttpError } from "../../shared/errors/HttpError";

const CreatePropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  rentAmount: z.number().min(0, "Rent must be at least 0"),
  leaseType: z.enum(["coworking", "residential", "short-term"]),
});

const UpdatePropertySchema = z.object({
  title: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  rentAmount: z.number().min(0).optional(),
  leaseType: z.enum(["coworking", "residential", "short-term"]).optional(),
});

const ListPropertiesSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  leaseType: z.enum(["coworking", "residential", "short-term"]).optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
});

export const PropertyController = {
  // POST /landlords/properties
  async create(req: Request, res: Response) {
    const parsed = CreatePropertySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: z.flattenError(parsed.error) });
    }

    if (!req.landlordId) throw new HttpError(401, "Missing or invalid Authorization header");

    const result = await PropertyService.create({
      ...parsed.data,
      owner: req.landlordId
    });
    res.status(201).json(result);
  },

  // GET /landlords/properties
  async list(req: Request, res: Response) {
    const parsed = ListPropertiesSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ errors: z.flattenError(parsed.error) });
    }

    const { title, location, leaseType, priceMin, priceMax, page, limit } = parsed.data;

    const filters = {
      title,
      location,
      leaseType,
      priceRange: priceMin || priceMax ? { min: priceMin, max: priceMax } : undefined,
      page,
      limit,
    };

    if (!req.landlordId) throw new HttpError(401, "Missing or invalid Authorization header");
    const ownerId = req.landlordId;

    const result = await PropertyService.list(ownerId, filters);
    res.json(result);
  },

  // GET /properties/:id
  async getById(req: Request, res: Response) {
    const propertyId = req.params.id;

    if (!req.landlordId) throw new HttpError(401, "Missing or invalid Authorization header");
    const ownerId = req.landlordId;

    const result = await PropertyService.getById(propertyId, ownerId);
    res.json(result);
  },

  // PATCH /properties/:id
  async update(req: Request, res: Response) {
    if (!req.landlordId) throw new HttpError(401, "Missing or invalid Authorization header");
    const ownerId = req.landlordId;
    const propertyId = req.params.id;

    const parsed = UpdatePropertySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: z.flattenError(parsed.error) });
    }

    const result = await PropertyService.update(propertyId, ownerId, parsed.data);
    res.json(result);
  },

  // DELETE /properties/:id
  async remove(req: Request, res: Response) {
    const propertyId = req.params.id;
    
    if (!req.landlordId) throw new HttpError(401, "Missing or invalid Authorization header");
    const ownerId = req.landlordId;

    const result = await PropertyService.remove(propertyId, ownerId);
    res.json(result);
  },
};
