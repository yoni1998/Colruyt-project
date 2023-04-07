import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getProduct(id: String!): Product
    getAllProducts: [Products]
    getBasket(id: String!): Basket
    getAllBaskets: [Baskets]
  }

  type Mutation {
    removeProduct(id: ID!): Products
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    removeBasket(id: ID!): Baskets
    createBasket(input: BasketInput): Basket
    updateBasket(id: ID!, input: BasketInput): Basket
  }

  type Product {
    DATA: Products
  }

  input ProductInput {
    naam: String
    aantal: String
    prijs: String
  }

  type Products {
    _id: ID
    naam: String
    aantal: String
    prijs: String
  }

  type Basket {
    DATA: Baskets
  }

  input BasketInput {
    naam: String
    aantal: String
  }

  type Baskets {
    _id: ID
    naam: String
    aantal: String
  }
`;