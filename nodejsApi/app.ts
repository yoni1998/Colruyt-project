/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { Routes } from "./routes/index";
import { UserRoutes } from "./routes/user_routes";
dotenv.config();
/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const routes: Routes = new Routes();
const user_routes: UserRoutes = new UserRoutes();
const PORT: number = parseInt(process.env.PORT as string, 10);
const URI: string = process.env.URI as string;

const app = express();
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
routes.route(app);
user_routes.route();

const connectDB = async () => {
  const conn = await mongoose.connect(URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
// connect to db
connectDB();
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
