import {gql} from '@apollo/client';

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

export const UPDATE_BASKET_ON_ID = gql`
  mutation UpdateBasket($updateBasketId: ID!, $input: NewBasketInput) {
    updateBasket(id: $updateBasketId, input: $input) {
      DATA {
        _id
      }
    }
  }
`;
