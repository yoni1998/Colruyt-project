import cors from "cors";
import { schema } from "./typedefs/productTypedef";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import bodyParser from "body-parser";
import { ProductDatasource } from "./datasource/productDatasource";
import { resolvers } from "./resolvers/productResolver";
import { BasketDatasource } from "./datasource/basketDatasource";

const server = new ApolloServer({
  schema,
  resolvers,
  dataSources: () => ({
    productDatasource: new ProductDatasource(),
    basketDatasource: new BasketDatasource(),
  }),
});

const app = express();

const connect = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

connect();
app.use(cors());
app.use(bodyParser.json());
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
