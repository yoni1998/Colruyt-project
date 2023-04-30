import { IProduct } from "./product.interface";

export interface IProducts {
  _id?: String;
  productId: [IProduct];
  quantity: Number;
}
