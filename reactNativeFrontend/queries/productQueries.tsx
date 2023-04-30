import {gql} from '../node_modules/graphql-request/build/esm/index';

export const GET_PRODUCTS = gql`
  query Query($search: String!, $minPrice: Int, $maxPrice: Int) {
    products(search: $search, minPrice: $minPrice, maxPrice: $maxPrice) {
      inStock
      kcal
      productImage
      price
      name
      _id
    }
  }
`;
