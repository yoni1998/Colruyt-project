import { NextFunction } from "express";

// Middleware function
const userMiddleware: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware user is called");
  next();
};

export default userMiddleware;
