import cors from "cors";
import { resolvers } from "./resolvers/userResolver";
import { typeDefs } from "./typedefs/userTypedef";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import bodyParser from "body-parser";
import UserDatasource from "./datasource/userDatasource";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userDatasource: new UserDatasource(),
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
