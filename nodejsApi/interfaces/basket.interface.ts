import { ModificationNote } from "../common/AbstractModel";
import { IProduct } from "./product.interface";

export interface IBasket {
  _id?: String;
  productId: [IProduct];
  aantal: String;
  modification_notes: ModificationNote;
}
