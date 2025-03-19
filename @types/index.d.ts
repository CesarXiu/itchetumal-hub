import 'express'; // Importa express para extender sus tipos
declare global {
  namespace Express {
    interface Request {
      user?: any; // La propiedad user es opcional y de tipo `any`
    }
  }
}