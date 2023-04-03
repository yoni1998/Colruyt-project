import * as mongoose from "mongoose";
import { ModificationNote } from "../common/modules.common.model";

const schema = new mongoose.Schema({
  name: String,
  title: String,
  modification_notes: [ModificationNote],
});

export default mongoose.model("articles", schema);
