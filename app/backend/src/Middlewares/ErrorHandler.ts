import { ErrorRequestHandler, Response, Request } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req: Request, res: Response, _next): Response =>
  res.status(err.status || 500).json({ message: err.message });

export default errorHandler;
