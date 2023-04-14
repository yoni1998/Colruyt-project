import * as mongoose from "mongoose";
import { ModificationNote } from "../common/AbstractModel";

const schema = new mongoose.Schema({
  naam: String,
  imageBackground: String,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      aantal: String,
    },
  ],
  modification_notes: [ModificationNote],
});

export default mongoose.model("basket", schema);
