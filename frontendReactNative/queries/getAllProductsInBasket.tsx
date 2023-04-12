import { gql } from "@apollo/client";

export const GET_PRODUCTS_IN_BASKET = gql`
  query Query {
    getAllBaskets {
      productId
      aantal
    }
  }
`;
