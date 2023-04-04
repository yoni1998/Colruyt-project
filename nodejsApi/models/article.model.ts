import * as mongoose from "mongoose";
import { ModificationNote } from "../common/AbstractModel";

const schema = new mongoose.Schema({
  name: String,
  title: String,
  modification_notes: [ModificationNote],
});

export default mongoose.model("articles", schema);
