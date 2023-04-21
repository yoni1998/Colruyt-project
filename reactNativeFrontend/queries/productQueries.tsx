import {gql} from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Query($search: String, $minPrice: String, $maxPrice: String) {
    getAllProducts(search: $search, minPrice: $minPrice, maxPrice: $maxPrice) {
      prijs
      naam
      aantal
      _id
    }
  }
`;

export const GET_PRODUCT_ON_ID = gql`
  query Query($getProductId: String!) {
    getProduct(id: $getProductId) {
      DATA {
        naam
        aantal
        prijs
        _id
      }
    }
  }
`;
