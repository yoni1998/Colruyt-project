import {gql} from '../node_modules/graphql-request/build/esm/index';

export const GET_PRODUCTS = gql`
  query Query($search: String!, $minPrice: String, $maxPrice: String) {
    products(search: $search, minPrice: $minPrice, maxPrice: $maxPrice) {
      prijs
      naam
      aantal
      _id
    }
  }
`;

export const GET_PRODUCT_ON_ID = gql`
  query Query($getProductId: String!) {
    product(id: $getProductId) {
      DATA {
        naam
        aantal
        prijs
        _id
      }
    }
  }
`;
