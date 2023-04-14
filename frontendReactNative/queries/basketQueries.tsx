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
  query GetAllBaskets($getBasketId: String!) {
    getBasket(id: $getBasketId) {
      DATA {
        _id
        naam
        imageBackground
        products {
          _id
          productId {
            _id
            naam
            prijs
            aantal
          }
        }
      }
    }
  }
`;
