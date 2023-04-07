import * as mongoose from "mongoose";
import { ModificationNote } from "../common/AbstractModel";

const schema = new mongoose.Schema({
  naam: String,
  aantal: String,
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
    default: [],
  },
  modification_notes: [ModificationNote],
});

export default mongoose.model("basket", schema);
