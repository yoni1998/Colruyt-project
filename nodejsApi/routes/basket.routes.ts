import express, { Request, Response } from "express";
import {
  createNewBasket,
  deleteBasketOnId,
  getBasketOnId,
  updateCurrentBasket,
  getAllBaskets,
  deleteProductInBasketOnId,
  addNewProductToBasket,
  updateProductInBasket,
  getProductInBasketOnId,
} from "../controllers/basket.controller";
let basketRouter = express.Router();

// use middleware
basketRouter
  .route("/")
  .get((req: Request, res: Response) => {
    getAllBaskets(req, res);
  })
  .post((req: Request, res: Response) => {
    createNewBasket(req, res);
  });

basketRouter
  .route("/:id")
  .get((req: Request, res: Response) => {
    getBasketOnId(req, res);
  })
  .put((req: Request, res: Response) => {
    updateCurrentBasket(req, res);
  })
  .delete((req: Request, res: Response) => {
    deleteBasketOnId(req, res);
  })
  .post((req: Request, res: Response) => {
    addNewProductToBasket(req, res);
  });

basketRouter
  .route("/:id/products/:productId")
  .delete((req: Request, res: Response) => {
    deleteProductInBasketOnId(req, res);
  })
  .put((req: Request, res: Response) => {
    updateProductInBasket(req, res);
  })
  .get((req: Request, res: Response) => {
    getProductInBasketOnId(req, res);
  });

export default basketRouter;
