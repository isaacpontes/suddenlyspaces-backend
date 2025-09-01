import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { ensureAuth } from "./middlewares/auth";
import { PropertyController } from "./controllers/PropertiesController";

export const router = Router();

// Authentication Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', ensureAuth, AuthController.me);

router.get('/properties', PropertyController.list);
router.get('/properties/:id', PropertyController.getById);
