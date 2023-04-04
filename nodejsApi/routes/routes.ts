import { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import { UserController } from "../controllers/userController";
import userMiddleware from "../middlewares/user.middleware";
import router from "./user_routes";
dotenv.config();

export class Routes extends UserController {
  ROOTPATH: string = process.env.ROOTPATH as string;
  SUBPATH: string = process.env.SUBPATH as string;

  public route(app: Application) {
    // middleware
    app.use(this.ROOTPATH, userMiddleware).use(this.SUBPATH, router);
    // app routes
    app.get(this.ROOTPATH, (req: Request, res: Response) => {
      this.getAllUsers(req, res);
    });
  }
}
