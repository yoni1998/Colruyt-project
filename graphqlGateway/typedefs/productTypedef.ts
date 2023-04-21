import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getProduct(id: String!): Product
    getAllProducts(
      search: String
      minPrice: String
      maxPrice: String
    ): [Products]
    getBasket(id: String!): Basket
    getAllBaskets: [Baskets]
  }

  type Mutation {
    removeProduct(id: ID!): Products
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    removeBasket(id: ID!): Baskets
    createBasket(input: NewBasketInput): Basket
    updateBasket(id: ID!, input: NewBasketInput): Basket
    removeProductFromBasket(id: ID!, productId: ID): Baskets
    addProductToBasket(id: ID!, input: BasketInput): Basket
    updateProductToBasket(id: ID, productId: ID!, input: BasketInput): Basket
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
    productId: String
    aantal: String
  }

  input NewBasketInput {
    naam: String
    imageBackground: String
  }

  type Baskets {
    _id: ID
    naam: String
    imageBackground: String
    products: [productIds]
  }

  type productIds {
    productId: Products
    aantal: String
    _id: ID
  }
`;
