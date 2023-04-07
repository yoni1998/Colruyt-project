import { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import productMiddleware from "../middlewares/product.middleware";
import router from "./product.routes";
import basketRouter from "./basket.routes";
import { getAllProducts } from "../controllers/product.controller";
dotenv.config();

export class Routes {
  private ROOTPATH: string = process.env.ROOTPATH as string;
  private SUBPATH: string = process.env.SUBPATH as string;

  public route(app: Application) {
    // middleware
    app
      .use("/", productMiddleware)
      .use("/api", router)
      .use("/api/basket", basketRouter);
    // app routes
    app.get("/", (req: Request, res: Response) => {
      getAllProducts(req, res);
    });
  }
}
