import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { ensureAuth } from "./middlewares/auth";
import { PropertyController } from "./controllers/PropertiesController";
import { InterestsController } from "./controllers/InteresetsController";

export const router = Router();

// Authentication Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', ensureAuth, AuthController.me);

router.get('/properties', PropertyController.list);
router.get('/properties/:id', PropertyController.getById);

router.post('/interests/:id', ensureAuth, InterestsController.addInterest);