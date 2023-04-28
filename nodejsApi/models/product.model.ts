import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  naam: String,
  productImage: String,
  kcal: Number,
  inStock: {
    type: Boolean,
    default: true,
  },
  prijs: Number,
});

export default mongoose.model("product", schema);
