import { IBasket } from "../interfaces/basket.interface";
import { IProducts } from "../interfaces/products.interface";
import basket from "../models/basket.model";

export const findAllBaskets = async () =>
  await basket.find().populate("products.productId");

export const basketOnId = async (id: any) =>
  await basket.findOne(id).populate("products.productId");

export const createBasket = async (newBasket: IBasket) => {
  const createdBasket = new basket(newBasket);
  return await createdBasket.save();
};

export const updateBasket = async (editBasket: IBasket) => {
  const id = { _id: editBasket._id };
  return await basket.findOneAndUpdate(id, editBasket);
};

export const deleteBasket = async (id: String) => {
  const basketOnId = { _id: id };
  return await basket.deleteOne(basketOnId);
};

export const productInBasketOnId = async (id: string, productId: string) =>
  await basket
    .findOne(
      { _id: id },
      { products: { _id: productId } },
      { projection: { productId: true } }
    )
    .populate("products");

export const deleteProductFromBasket = async (id: string, productId: string) =>
  await basket.findOneAndUpdate(
    { _id: id },
    { $pull: { products: { _id: productId } } },
    { new: true }
  );

export const createProductInBasket = async (id: string, product: IProducts) => {
  // check if the product already exists
  const basketData = await basket.findById(id);
  const arrayCheck = [];
  for (const products of basketData.products) {
    if (products.productId?.toString() === product.productId?.toString()) {
      arrayCheck.push("duplicated");
    }
  }
  if (arrayCheck.length > 0) {
    return await basket
      .findById(id)
      .updateOne(
        { "products.productId": product.productId },
        { $set: { "products.$.quantity": product.quantity } }
      );
  } else {
    return await basket.findOneAndUpdate(
      { _id: id },
      { $push: { products: product } },
      { new: true }
    );
  }
};

export const updateProductFromBasket = async (
  productId: string,
  product: IProducts
) =>
  await basket.updateOne(
    { "products._id": productId },
    { $set: { "products.$.quantity": product.quantity } }
  );
