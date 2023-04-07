import { ModificationNote } from "../common/AbstractModel";
import { IProduct } from "./product.interface";

export interface IBasket {
  _id?: String;
  naam: String;
  aantal: String;
  products?: IProduct[];
  modification_notes: ModificationNote;
}
