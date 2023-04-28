import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import {
  createNewProduct,
  deleteProductOnId,
  getProductOnId,
  updateCurrentProduct,
} from "../controllers/product.controller";
let router = express.Router();
dotenv.config();

const SUBPATH: string = process.env.SUBPATH as string;
// use middleware
router.route(SUBPATH).post((req: Request, res: Response) => {
  createNewProduct(req, res);
});

router
  .route(SUBPATH + "/:id")
  .get((req: Request, res: Response) => {
    getProductOnId(req, res);
  })
  .put((req: Request, res: Response) => {
    updateCurrentProduct(req, res);
  })
  .delete((req: Request, res: Response) => {
    deleteProductOnId(req, res);
  });

export default router;
