import express from 'express';
import cors from 'cors';
import { router as landlordsRouter} from './landlords/router';
import { router as tenantsRouter } from './tenants/router';
import { errorHandler } from './shared/middlewares/error-handler';

const app = express();

// =================
// Middlewares
// =================
app.use(express.json());
app.use(cors());

// =================
// Routes
// =================
app.use('/landlords', landlordsRouter);
app.use('/tenants', tenantsRouter);

// =================
// Error Handler
// =================
app.use(errorHandler);

export default app;