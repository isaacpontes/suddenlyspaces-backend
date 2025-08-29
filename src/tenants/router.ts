import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { ensureAuth } from "./middlewares/auth";

export const router = Router();

// Authentication Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', ensureAuth, AuthController.me);
