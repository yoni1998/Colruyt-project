import * as mongoose from "mongoose";
import { ModificationNote } from "../common/AbstractModel";

const schema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  aantal: String,
  modification_notes: [ModificationNote],
});

export default mongoose.model("basket", schema);
