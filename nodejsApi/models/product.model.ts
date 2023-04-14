import * as mongoose from "mongoose";
import { ModificationNote } from "../common/AbstractModel";

const schema = new mongoose.Schema({
  naam: String,
  prijs: Number,
  aantal: Number,
});

export default mongoose.model("product", schema);
