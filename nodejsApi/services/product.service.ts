import { IProduct } from "../interfaces/product.interface";
import product from "../models/product.model";

export const findAllProducts = async () => await product.find();

export const productOnId = async (id: any) => await product.findOne(id);

export const createProduct = async (newProduct: IProduct) => {
  const createdProduct = new product(newProduct);
  await createdProduct.save();
};

export const updateProduct = async (editProduct: IProduct) => {
  const id = { _id: editProduct._id };
  await product.findOneAndUpdate(id, editProduct);
};

export const deleteProduct = async (id: String) => {
  const productOnId = { _id: id };
  await product.deleteOne(productOnId);
};