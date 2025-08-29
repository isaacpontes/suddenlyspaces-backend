import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { ensureAuth } from "./middlewares/auth";
import { PropertyController } from "./controllers/PropertiesController";

export const router = Router();

// Authentication Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', ensureAuth, AuthController.me);

// Properties Management Routes
router.post("/properties", ensureAuth, PropertyController.create);
router.get("/properties", ensureAuth, PropertyController.list);
router.get("/properties/:id", ensureAuth, PropertyController.getById);
router.patch("/properties/:id", ensureAuth, PropertyController.update);
router.delete("/properties/:id", ensureAuth, PropertyController.remove);