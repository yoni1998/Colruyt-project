import { ModificationNote } from "../common/AbstractModel";

export interface IArticle {
  _id?: String;
  name: String;
  title: String;
  modification_notes: ModificationNote[];
}
