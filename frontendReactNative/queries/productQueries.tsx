import { gql } from "@apollo/client";

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
