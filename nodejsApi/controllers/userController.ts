import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../common/responseService";
import { IUser } from "../interfaces/user.interface";
import UserService from "../services/user.service";
import Joi from "joi";
export class UserController extends UserService {
  protected getAllUsers(req: Request, res: Response) {
    try {
      this.findAll().then((data: any) => {
        data
          ? successResponse("get all users successfully", data, res)
          : failureResponse("something went wrong", [], res);
      });
    } catch (err: any) {
      mongoError(err, res);
    }
  }

  protected getUserOnId(req: Request, res: Response) {
    try {
      if (req.params.id) {
        const userId = { _id: req.params.id };
        this.userOnId(userId).then((data) => {
          data
            ? successResponse("get user on id successfully", data, res)
            : failureResponse("something went wrong", data, res);
        });
      } else {
        insufficientParameters(res);
      }
    } catch (error) {
      mongoError(error, res);
    }
  }

  protected createNewUser(req: Request, res: Response) {
    // input validation
    const schema = Joi.object().keys({
      name: Joi.object().keys({
        first_name: Joi.string(),
        middle_name: Joi.string(),
        last_name: Joi.string(),
      }),
      email: Joi.string().email().required(),
      phone_number: Joi.string(),
      gender: Joi.string(),
    });
    if (schema.validate(req.body).error) {
      failureResponse(
        "something went wrong",
        schema.validate(req.body).error?.message,
        res
      );
    } else {
      // this check whether all the fields were send through the request or not
      const newUser: IUser = {
        name: {
          first_name: req.body.name?.first_name,
          middle_name: req.body.name?.middle_name,
          last_name: req.body.name?.last_name,
        },
        email: req.body.email,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        modification_notes: {
          modified_on: new Date(Date.now()),
          modified_by: "",
          modification_note: "New user created",
        },
      };
      // send request
      this.createUser(newUser);
      successResponse("create user successfully", newUser, res);
    }
  }

  protected updateCurrentUser(req: Request, res: Response) {
    if (req.params.id) {
      const userId = { _id: req.params.id };
      this.userOnId(userId).then((data: any) => {
        // input validation
        const schema = Joi.object().keys({
          name: Joi.object().keys({
            first_name: Joi.string(),
            middle_name: Joi.string(),
            last_name: Joi.string(),
          }),
          email: Joi.string().email().required(),
          phone_number: Joi.string(),
          gender: Joi.string(),
        });

        if (schema.validate(req.body).error) {
          failureResponse(
            "something went wrong",
            schema.validate(req.body).error?.message,
            res
          );
        } else {
          const editUser: IUser = {
            _id: req.params.id,
            name: req.body.name
              ? {
                  first_name: req.body.name.first_name
                    ? req.body.name.first_name
                    : data.name.first_name,
                  middle_name: req.body.name.first_name
                    ? req.body.name.middle_name
                    : data.name.middle_name,
                  last_name: req.body.name.first_name
                    ? req.body.name.last_name
                    : data.name.last_name,
                }
              : data.name,
            email: req.body.email ? req.body.email : data.email,
            phone_number: req.body.phone_number
              ? req.body.phone_number
              : data.phone_number,
            gender: req.body.gender ? req.body.gender : data.gender,
            is_deleted: req.body.is_deleted
              ? req.body.is_deleted
              : data.is_deleted,
            modification_notes: data.modification_notes,
          };
          this.updateUser(editUser).then((data) => {
            successResponse("update user successfully", data, res);
          });
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  protected deleteUserOnId(req: Request, res: Response) {
    if (req.params.id) {
      this.deleteUser(req.params.id).then(() => {
        successResponse(
          "delete user successfull with id " + req.params.id,
          null,
          res
        );
      });
    } else {
      insufficientParameters(res);
    }
  }
}
