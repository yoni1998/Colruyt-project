import { NextFunction } from "express";

// Middleware function
const productMiddleware: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware product is called");
  next();
};

export default productMiddleware;
