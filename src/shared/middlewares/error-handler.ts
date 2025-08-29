import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    console.error(error.message);
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof Error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }

  console.error('Unknown error');
  res.status(500).json({ error: 'Unknown error' });
};
