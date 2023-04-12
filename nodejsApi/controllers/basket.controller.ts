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
} from "../services/basket.service";
import { IBasket } from "../interfaces";

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
    productId: Joi.string().required(),
    aantal: Joi.number().required(),
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
      productId: req.body.productId,
      aantal: req.body.aantal,
      modification_notes: {
        modified_on: new Date(Date.now()),
        modified_by: "",
        modification_note: "New Item for basket created",
      },
    };
    // send request
    createBasket(newBasket).then(() => {
      successResponse("create item for basket successfully", newBasket, res);
    });
  }
};

export const updateCurrentBasket = (req: Request, res: Response) => {
  if (req.params.id) {
    const basketId = { _id: req.params.id };
    basketOnId(basketId).then((data: any) => {
      // input validation
      const schema = Joi.object().keys({
        productId: Joi.string().required(),
        aantal: Joi.number().required(),
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
          productId: req.body.productId ? req.body.productId : data.productId,
          aantal: req.body.aantal ? req.body.aantal : data.aantal,
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
        "delete basket successfull with id " + req.params.id,
        null,
        res
      );
    });
  } else {
    insufficientParameters(res);
  }
};
