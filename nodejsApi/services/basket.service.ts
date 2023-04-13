import { IBasket } from "../interfaces/basket.interface";
import basket from "../models/basket.model";

export const findAllBaskets = async () =>
  await basket.find().populate("productId");

export const basketOnId = async (id: any) => await basket.findOne(id);

export const createBasket = async (newBasket: IBasket) => {
  const createdBasket = new basket(newBasket);
  await createdBasket.save();
};

export const updateBasket = async (editBasket: IBasket) => {
  const id = { _id: editBasket._id };
  await basket.findOneAndUpdate(id, editBasket);
};

export const deleteBasket = async (id: String) => {
  const basketOnId = { _id: id };
  await basket.deleteOne(basketOnId);
};
