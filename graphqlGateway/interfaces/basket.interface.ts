import { IProducts } from "./products.interface";

export interface IBasket {
  _id?: String;
  naam: String;
  imageBackground: String;
  products?: IProducts[];
}
