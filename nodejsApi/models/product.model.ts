import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  naam: String,
  prijs: Number,
  aantal: Number,
});

export default mongoose.model("product", schema);
