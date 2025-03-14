import { Request, Response, NextFunction } from 'express';
import pageSchema from '../schemas/pageSchema';

export default function pageFormatMiddleware(req: Request, res: Response, next: NextFunction) {
    const result = pageSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "Datos inválidos",
        details: result.error.format(),
      });
      return;
    }  
    next();
    return;
};