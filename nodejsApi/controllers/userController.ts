import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../common/modules.common.service";
import { IUser } from "../interfaces/user.interface";
import UserService from "../services/user.service";

export class UserController {
  private user_service: UserService = new UserService();

  public create_user(req: Request, res: Response) {
    console.log(req.body);
    // this check whether all the fields were send through the request or not
    const user_params: IUser = {
      name: {
        first_name: req.body.name?.first_name,
        middle_name: req.body.name?.middle_name,
        last_name: req.body.name?.last_name,
      },
      email: req.body.email,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      modification_notes: [
        {
          modified_on: new Date(Date.now()),
          modified_by: "",
          modification_note: "New user created",
        },
      ],
    };
    this.user_service.createUser(user_params);
    successResponse("create user successfull", user_params, res);
  }

  public get_user(req: Request, res: Response) {
    if (req.params.id) {
      const userId = { _id: req.params.id };
      this.user_service
        .userOnId(userId)
        .then((x) => successResponse("get user on id successfull", x, res));
    } else {
      insufficientParameters(res);
    }
  }

  public get_all_users(req: Request, res: Response) {
    this.user_service
      .findAll()
      .then((x) => successResponse("get all users successfull", x, res));
  }

  public update_user(req: Request, res: Response) {
    if (
      (req.params.id && req.body.name) ||
      req.body.name.first_name ||
      req.body.name.middle_name ||
      req.body.name.last_name ||
      req.body.email ||
      req.body.phone_number ||
      req.body.gender
    ) {
      const user_filter = { _id: req.params.id };
      this.user_service.userOnId(user_filter).then((user_data: any) => {
        const user_params: IUser = {
          _id: req.params.id,
          name: req.body.name
            ? {
                first_name: req.body.name.first_name
                  ? req.body.name.first_name
                  : user_data.name.first_name,
                middle_name: req.body.name.first_name
                  ? req.body.name.middle_name
                  : user_data.name.middle_name,
                last_name: req.body.name.first_name
                  ? req.body.name.last_name
                  : user_data.name.last_name,
              }
            : user_data.name,
          email: req.body.email ? req.body.email : user_data.email,
          phone_number: req.body.phone_number
            ? req.body.phone_number
            : user_data.phone_number,
          gender: req.body.gender ? req.body.gender : user_data.gender,
          is_deleted: req.body.is_deleted
            ? req.body.is_deleted
            : user_data.is_deleted,
          modification_notes: user_data.modification_notes,
        };
        this.user_service.updateUser(user_params).then((x) => {
          successResponse("update user successfull", x, res);
        });
      });
    }
  }

  public delete_user(req: Request, res: Response) {
    if (req.params.id) {
      this.user_service.deleteUser(req.params.id);
      successResponse(
        "delete user successfull with id " + req.params.id,
        null,
        res
      );
    } else {
      insufficientParameters(res);
    }
  }
}
