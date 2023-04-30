import {gql} from '../node_modules/graphql-request/build/esm/index';

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
        quantity
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
        quantity
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
  mutation RemoveBasket($id: ID!) {
    removeBasket(id: $id) {
      _id
    }
  }
`;

export const UPDATE_BASKET_ON_ID = gql`
  mutation Mutation($basketId: ID!, $input: NewBasketInput) {
    updateBasket(id: $basketId, input: $input) {
      _id
      name
      imageBackground
    }
  }
`;

export const ADD_PRODUCT_TO_BASKET = gql`
  mutation AddProductToBasket($input: BasketProductInput, $basketId: ID!) {
    addProductToBasket(input: $input, basketId: $basketId) {
      _id
      products {
        _id
        quantity
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
  mutation Mutation($basketId: ID!, $productId: ID!) {
    removeProductFromBasket(basketId: $basketId, productId: $productId) {
      _id
    }
  }
`;

export const UPDATE_PRODUCT_IN_BASKET = gql`
  mutation Mutation(
    $basketId: ID!
    $productId: ID!
    $input: BasketProductInput
  ) {
    updateProductToBasket(
      basketId: $basketId
      productId: $productId
      input: $input
    ) {
      _id
      products {
        _id
        quantity
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
