import {gql} from '../node_modules/graphql-request/build/esm/index';

export const ADD_PRODUCT_TO_BASKET = gql`
  mutation AddProductToBasket(
    $input: BasketProductInput
    $addProductToBasketId: ID!
  ) {
    addProductToBasket(input: $input, id: $addProductToBasketId) {
      _id
      products {
        _id
        amount
        productId {
          inStock
          kcal
          productImage
          price
          name
          _id
        }
      }
    }
  }
`;

export const DELETE_PRODUCT_IN_BASKET = gql`
  mutation Mutation($removeProductFromBasketId: ID!, $productId: ID!) {
    removeProductFromBasket(
      id: $removeProductFromBasketId
      productId: $productId
    ) {
      _id
    }
  }
`;

export const UPDATE_PRODUCT_IN_BASKET = gql`
  mutation Mutation(
    $updateProductToBasketId: ID!
    $productId: ID!
    $input: BasketProductInput
  ) {
    updateProductToBasket(
      id: $updateProductToBasketId
      productId: $productId
      input: $input
    ) {
      _id
      products {
        _id
        amount
        productId {
          inStock
          kcal
          productImage
          price
          name
          _id
        }
      }
    }
  }
`;

export const GET_ALL_BASKETS = gql`
  query Query {
    baskets {
      name
      imageBackground
      _id
      products {
        productId {
          inStock
          kcal
          productImage
          price
          name
          _id
        }
        _id
        amount
      }
    }
  }
`;

export const GET_BASKET_ON_ID = gql`
  query Query($basketId: String!) {
    basket(id: $basketId) {
      name
      imageBackground
      products {
        _id
        amount
        productId {
          inStock
          kcal
          productImage
          price
          name
          _id
        }
      }
    }
  }
`;

export const ADD_NEW_BASKET = gql`
  mutation Mutation($input: NewBasketInput) {
    createBasket(input: $input) {
      _id
      name
      imageBackground
    }
  }
`;

export const REMOVE_BASKET_ON_ID = gql`
  mutation RemoveBasket($removeBasketId: ID!) {
    removeBasket(id: $removeBasketId) {
      _id
    }
  }
`;

export const UPDATE_BASKET_ON_ID = gql`
  mutation Mutation($updateBasketId: ID!, $input: NewBasketInput) {
    updateBasket(id: $updateBasketId, input: $input) {
      _id
      name
      imageBackground
    }
  }
`;
