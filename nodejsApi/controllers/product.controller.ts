import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../common/responseService";
import { IProduct } from "../interfaces/product.interface";
import Joi from "joi";
import {
  findAllProducts,
  productOnId,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/product.service";

export const getAllProducts = (req: Request, res: Response) => {
  try {
    findAllProducts(
      req.query?.search,
      req.query?.minPrice,
      req.query?.maxPrice
    ).then((data: any) => {
      data
        ? successResponse("get all products successfully", data, res)
        : failureResponse("something went wrong", [], res);
    });
  } catch (err: any) {
    mongoError(err, res);
  }
};

export const getProductOnId = (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const productId = { _id: req.params.id };
      productOnId(productId).then((data: any) => {
        data
          ? successResponse("get product on id successfully", data, res)
          : failureResponse("something went wrong", data, res);
      });
    } else {
      insufficientParameters(res);
    }
  } catch (error) {
    mongoError(error, res);
  }
};

export const createNewProduct = (req: Request, res: Response) => {
  // input validation
  const schema = Joi.object().keys({
    naam: Joi.string().required(),
    prijs: Joi.number().required(),
    productImage: Joi.string(),
    kcal: Joi.number(),
    inStock: Joi.boolean().required(),
  });
  if (schema.validate(req.body).error) {
    failureResponse(
      "something went wrong",
      schema.validate(req.body).error?.message,
      res
    );
  } else {
    // this check whether all the fields were send through the request or not
    const newProduct: IProduct = {
      naam: req.body.naam,
      prijs: req.body.prijs,
      productImage: req.body.productImage,
      kcal: req.body.kcal,
      inStock: req.body.inStock,
    };
    // send request
    createProduct(newProduct).then(() => {
      successResponse("create product successfully", newProduct, res);
    });
  }
};

export const updateCurrentProduct = (req: Request, res: Response) => {
  if (req.params.id) {
    const productId = { _id: req.params.id };
    productOnId(productId).then((data: any) => {
      // input validation
      const schema = Joi.object().keys({
        naam: req.body.naam,
        prijs: req.body.prijs,
        productImage: req.body.productImage,
        kcal: req.body.kcal,
        inStock: req.body.inStock,
      });

      if (schema.validate(req.body).error) {
        failureResponse(
          "something went wrong",
          schema.validate(req.body).error?.message,
          res
        );
      } else {
        const editProduct: IProduct = {
          _id: req.params.id,
          naam: req.body.naam ? req.body.naam : data.naam,
          prijs: req.body.prijs ? req.body.prijs : data.prijs,
          productImage: req.body.productImage
            ? req.body.productImage
            : data.productImage,
          kcal: req.body.kcal ? req.body.kcal : data.kcal,
          inStock: req.body.inStock ? req.body.inStock : data.inStock,
        };
        updateProduct(editProduct).then((data: any) => {
          successResponse("update product successfully", data, res);
        });
      }
    });
  } else {
    insufficientParameters(res);
  }
};

export const deleteProductOnId = (req: Request, res: Response) => {
  if (req.params.id) {
    deleteProduct(req.params.id).then(() => {
      successResponse(
        "delete product successfully with id " + req.params.id,
        null,
        res
      );
    });
  } else {
    insufficientParameters(res);
  }
};
