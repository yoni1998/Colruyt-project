import express, { Request, Response } from "express";
import {
  createNewProduct,
  deleteProductOnId,
  getProductOnId,
  updateCurrentProduct,
} from "../controllers/product.controller";
let router = express.Router();

// use middleware
router.route("/product").post((req: Request, res: Response) => {
  createNewProduct(req, res);
});

router
  .route("/product/:id")
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
