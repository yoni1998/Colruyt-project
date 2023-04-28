import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../common/responseService";
import Joi from "joi";
import {
  findAllBaskets,
  basketOnId,
  createBasket,
  deleteBasket,
  updateBasket,
  deleteProductFromBasket,
  createProductInBasket,
  updateProductFromBasket,
  productInBasketOnId,
} from "../services/basket.service";
import { IBasket } from "../interfaces";
import { IProducts } from "../interfaces/products.interface";

export const getAllBaskets = (req: Request, res: Response) => {
  try {
    findAllBaskets().then((data: any) => {
      data
        ? successResponse("get all baskets successfully", data, res)
        : failureResponse("something went wrong", [], res);
    });
  } catch (err: any) {
    mongoError(err, res);
  }
};

export const getBasketOnId = (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const basketId = { _id: req.params.id };
      basketOnId(basketId).then((data: any) => {
        data
          ? successResponse("get basket on id successfully", data, res)
          : failureResponse("something went wrong", data, res);
      });
    } else {
      insufficientParameters(res);
    }
  } catch (error) {
    mongoError(error, res);
  }
};

export const createNewBasket = (req: Request, res: Response) => {
  // input validation
  const schema = Joi.object().keys({
    naam: Joi.string().required(),
    imageBackground: Joi.string().required(),
  });
  if (schema.validate(req.body).error) {
    failureResponse(
      "something went wrong",
      schema.validate(req.body).error?.message,
      res
    );
  } else {
    // this check whether all the fields were send through the request or not
    const newBasket: IBasket = {
      naam: req.body.naam,
      imageBackground: req.body.imageBackground,
      modification_notes: {
        modified_on: new Date(Date.now()),
        modified_by: "",
        modification_note: "New basket created",
      },
    };
    // send request
    createBasket(newBasket).then(() => {
      successResponse("created basket successfully", newBasket, res);
    });
  }
};

export const updateCurrentBasket = (req: Request, res: Response) => {
  if (req.params.id) {
    const basketId = { _id: req.params.id };
    basketOnId(basketId).then((data: any) => {
      // input validation
      const schema = Joi.object().keys({
        naam: Joi.string().required(),
        imageBackground: Joi.string().required(),
      });

      if (schema.validate(req.body).error) {
        failureResponse(
          "something went wrong",
          schema.validate(req.body).error?.message,
          res
        );
      } else {
        const editBasket: IBasket = {
          _id: req.params.id,
          naam: req.body.naam ? req.body.naam : data.naam,
          imageBackground: req.body.imageBackground
            ? req.body.imageBackground
            : data.imageBackground,
          modification_notes: data.modification_notes,
        };
        updateBasket(editBasket).then((data: any) => {
          successResponse("update basket successfully", data, res);
        });
      }
    });
  } else {
    insufficientParameters(res);
  }
};

export const deleteBasketOnId = (req: Request, res: Response) => {
  if (req.params.id) {
    deleteBasket(req.params.id).then(() => {
      successResponse(
        "delete basket successfully with id " + req.params.id,
        null,
        res
      );
    });
  } else {
    insufficientParameters(res);
  }
};

export const getProductInBasketOnId = (req: Request, res: Response) => {
  try {
    if (req.params.id && req.params.productId) {
      productInBasketOnId(req.params.id, req.params.productId).then(
        (data: any) => {
          data
            ? successResponse(
                "get product in basket on id successfully",
                data,
                res
              )
            : failureResponse("something went wrong", data, res);
        }
      );
    } else {
      insufficientParameters(res);
    }
  } catch (error) {
    mongoError(error, res);
  }
};

export const deleteProductInBasketOnId = (req: Request, res: Response) => {
  if (req.params.productId) {
    deleteProductFromBasket(req.params.id, req.params.productId).then(() => {
      successResponse(
        "delete product in basket successfully with id " + req.params.productId,
        null,
        res
      );
    });
  } else {
    insufficientParameters(res);
  }
};

export const addNewProductToBasket = (req: Request, res: Response) => {
  if (req.params.id) {
    const newProduct: IProducts = {
      aantal: req.body.aantal,
      productId: req.body.productId,
    };
    // send request
    createProductInBasket(req.params.id, newProduct).then(() => {
      successResponse("created basket successfully", newProduct, res);
    });
  }
};

export const updateProductInBasket = (req: Request, res: Response) => {
  if (req.params.productId) {
    const basketId = { _id: req.params.id };
    basketOnId(basketId).then((data: any) => {
      // input validation
      const schema = Joi.object().keys({
        aantal: Joi.number().required(),
      });

      if (schema.validate(req.body).error) {
        failureResponse(
          "something went wrong",
          schema.validate(req.body).error?.message,
          res
        );
      } else {
        const editProductInBasket: any = {
          _id: req.params.id,
          aantal: req.body.aantal ? req.body.aantal : data.aantal,
        };

        updateProductFromBasket(req.params.productId, editProductInBasket).then(
          (data: any) => {
            successResponse("update product in basket successfully", data, res);
          }
        );
      }
    });
  } else {
    insufficientParameters(res);
  }
};
