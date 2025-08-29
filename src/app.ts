import express from 'express';
import { router as landlordsRouter} from './landlords/router';
import { router as tenantsRouter } from './tenants/router';
import { errorHandler } from './shared/middlewares/error-handler';

const app = express();

// =================
// Middlewares
// =================
app.use(express.json());

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