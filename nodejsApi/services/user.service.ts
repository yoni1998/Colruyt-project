import { IUser } from "../interfaces/user.interface";
import user from "../models/user.model";

export default class UserService {
  protected findAll = async () => await user.find();

  protected userOnId = async (id: any) => await user.findOne(id);

  protected createUser(newUser: IUser) {
    const createdUser = new user(newUser);
    createdUser.save();
  }

  protected updateUser = async (editUser: IUser) => {
    const id = { _id: editUser._id };
    await user.findOneAndUpdate(id, editUser);
  };

  protected deleteUser = async (id: String) => {
    const userOnId = { _id: id };
    await user.deleteOne(userOnId);
  };
}
