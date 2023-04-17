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
