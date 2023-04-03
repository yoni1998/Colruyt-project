import { IUser } from "../interfaces/user.interface";
import users from "../models/user.model";

export default class UserService {
  public createUser(user_params: IUser) {
    const _session = new users(user_params);
    _session.save();
  }
  public findAll = async () => users.find();

  public userOnId = async (id: any) => await users.findOne(id);

  public updateUser = async (user_params: IUser) => {
    const query = { _id: user_params._id };
    await users.findOneAndUpdate(query, user_params);
  };

  public deleteUser = async (_id: String) => {
    const query = { _id: _id };
    await users.deleteOne(query);
  };
}
