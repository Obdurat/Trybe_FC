import { Request, Response, NextFunction } from 'express';

const controllerWrapper = (func: (req: Request, res: Response) => Promise<Response>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res);
    } catch (error) {
      next(error);
    }
  };

export default controllerWrapper;
