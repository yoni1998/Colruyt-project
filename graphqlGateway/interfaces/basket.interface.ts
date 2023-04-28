import { IProducts } from "./products.interface";

export interface IBasket {
  _id?: String;
  name: String;
  imageBackground: String;
  products?: IProducts[];
}
