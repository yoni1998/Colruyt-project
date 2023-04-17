import { gql } from "@apollo/client";

export const GET_ALL_BASKETS = gql`
  query GetAllBaskets {
    getAllBaskets {
      _id
      naam
      imageBackground
      products {
        productId {
          naam
          aantal
          prijs
        }
      }
    }
  }
`;

export const GET_BASKET_ON_ID = gql`
  query Query($getBasketId: String!) {
    getBasket(id: $getBasketId) {
      DATA {
        _id
        products {
          aantal
          _id
          productId {
            _id
            aantal
            naam
            prijs
          }
        }
      }
    }
  }
`;

export const ADD_NEW_BASKET = gql`
  mutation CreateBasket($input: NewBasketInput) {
    createBasket(input: $input) {
      DATA {
        naam
        _id
      }
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
