import * as mongoose from "mongoose";
import { ModificationNote } from "../common/AbstractModel";

const schema = new mongoose.Schema({
  name: String,
  imageBackground: String,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      amount: String,
    },
  ],
  modification_notes: [ModificationNote],
});

export default mongoose.model("basket", schema);
