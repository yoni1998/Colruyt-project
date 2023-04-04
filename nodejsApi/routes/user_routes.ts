import express, { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import userMiddleware from "../middlewares/user.middleware";
let router = express.Router();

export class UserRoutes extends UserController {
  public route() {
    // use middleware
    router
      .use("/user", userMiddleware)
      .route("/user")
      .post((req: Request, res: Response) => {
        this.createNewUser(req, res);
      });

    router
      .route("/user/:id")
      .get((req: Request, res: Response) => {
        this.getUserOnId(req, res);
      })
      .put((req: Request, res: Response) => {
        this.updateCurrentUser(req, res);
      })
      .delete((req: Request, res: Response) => {
        this.deleteUserOnId(req, res);
      });
  }
}

export default router;
