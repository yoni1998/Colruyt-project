import { gql } from "@apollo/client";

export const GET_PRODUCTS_IN_BASKET = gql`
  query Query {
    getAllBaskets {
      _id
      productId
      aantal
    }
  }
`;

export const ADD_PRODUCT_TO_BASKET = gql`
  mutation Mutation($input: BasketInput) {
    createBasket(input: $input) {
      DATA {
        _id
        productId
        aantal
      }
    }
  }
`;

export const DELETE_PRODUCT_IN_BASKET = gql`
  mutation Mutation($removeBasketId: ID!) {
    removeBasket(id: $removeBasketId) {
      _id
      productId
      aantal
    }
  }
`;
