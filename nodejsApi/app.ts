/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { UserRoutes, ArticleRoutes } from "./routes/index";
dotenv.config();
/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}
const user_routes: UserRoutes = new UserRoutes();
const article_routes: ArticleRoutes = new ArticleRoutes();
const PORT: number = parseInt(process.env.PORT as string, 10);
const URI: string = process.env.URI as string;

const app = express();
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
user_routes.route(app);
article_routes.route(app);

const connectDB = async () => {
  const conn = await mongoose.connect(URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

connectDB();
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
