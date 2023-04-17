import { gql } from "@apollo/client";

export const ADD_PRODUCT_TO_BASKET = gql`
  mutation Mutation($addProductToBasketId: ID!, $input: BasketInput) {
    addProductToBasket(id: $addProductToBasketId, input: $input) {
      DATA {
        products {
          aantal
          productId {
            naam
            aantal
            prijs
            _id
          }
        }
        imageBackground
        naam
        _id
      }
    }
  }
`;

export const DELETE_PRODUCT_IN_BASKET = gql`
  mutation Mutation($removeProductFromBasketId: ID!, $productId: ID) {
    removeProductFromBasket(
      id: $removeProductFromBasketId
      productId: $productId
    ) {
      _id
    }
  }
`;
