import { IBasket } from "../interfaces/basket.interface";
import { IProducts } from "../interfaces/products.interface";
import basket from "../models/basket.model";

export const findAllBaskets = async () =>
  await basket.find().populate("products.productId");

export const basketOnId = async (id: any) =>
  await basket.findOne(id).populate("products.productId");

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

export const productInBasketOnId = async (id: string, productId: string) =>
  await basket
    .findOne(
      { _id: id },
      { products: { _id: productId } },
      { projection: { productId: true } }
    )
    .populate("products");

export const deleteProductFromBasket = async (
  id: string,
  productId: string
) => {
  await basket.findOneAndUpdate(
    { _id: id },
    { $pull: { products: { _id: productId } } },
    { new: true }
  );
};

export const createProductInBasket = async (id: string, product: IProducts) => {
  await basket.findOneAndUpdate(
    { _id: id },
    { $push: { products: product } },
    { new: true }
  );
};

export const updateProductFromBasket = async (
  productId: string,
  product: IProducts
) => {
  return await basket.updateOne(
    { "products._id": productId },
    { $set: { "products.$.amount": product.amount } }
  );
};
