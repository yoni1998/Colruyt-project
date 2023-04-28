import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  productImage: String,
  kcal: Number,
  inStock: {
    type: Boolean,
    default: true,
  },
  price: Number,
});

export default mongoose.model("product", schema);
