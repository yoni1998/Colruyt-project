import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query($search: String!) {
    getAllProducts(search: $search) {
      naam
      prijs
    }
  }
`;
