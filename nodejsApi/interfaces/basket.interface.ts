import { ModificationNote } from "../common/AbstractModel";
import { IProduct } from "./product.interface";

export interface IBasket {
  _id?: String;
  productId: String;
  aantal: String;
  modification_notes: ModificationNote;
}
