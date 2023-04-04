import express, { Application, Request, Response } from "express";
import { UserController } from "../controllers/userController";
import userMiddleware from "../middlewares/user.middleware";
const router = express.Router();

export class UserRoutes extends UserController {
  public route(app: Application) {
    // middlewares
    router.use("/", userMiddleware);
    app.use("/api/users", userMiddleware);

    // app routes
    app.get("/api/users", (req: Request, res: Response) => {
      this.getAllUsers(req, res);
    });

    app.post("/api/user", (req: Request, res: Response) => {
      this.createNewUser(req, res);
    });

    // router
    app.use("/api/user", router);
    router
      .route("/:id")
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
