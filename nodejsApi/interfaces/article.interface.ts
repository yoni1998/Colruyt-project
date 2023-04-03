import { ModificationNote } from "../common/modules.common.model";

export interface IArticle {
  _id?: String;
  name: String;
  title: String;
  modification_notes: ModificationNote[];
}
