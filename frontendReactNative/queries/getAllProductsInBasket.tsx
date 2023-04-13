import { gql } from "@apollo/client";

export const GET_PRODUCTS_IN_BASKET = gql`
  query Query {
    getAllBaskets {
      _id
      aantal
      productId {
        naam
        aantal
        prijs
      }
    }
  }
`;

export const ADD_PRODUCT_TO_BASKET = gql`
  mutation Mutation($input: BasketInput) {
    createBasket(input: $input) {
      DATA {
        _id
        productId {
          naam
          aantal
          prijs
        }
        aantal
      }
    }
  }
`;

export const DELETE_PRODUCT_IN_BASKET = gql`
  mutation Mutation($removeBasketId: ID!) {
    removeBasket(id: $removeBasketId) {
      _id
    }
  }
`;
