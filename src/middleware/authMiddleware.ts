//import { Request, Response, NextFunction } from "express";
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
declare module 'express' {
    interface Request {
      user?: any; // La propiedad user es opcional y de tipo `any`
    }
  }
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.split(" ")[1];
    
    if (!token) {
        res.status(401).json({ message: "Acceso denegado" });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
        req.user = decoded; //req.user está definido en el archivo de tipos (src/express.d.ts)
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
}
