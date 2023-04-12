import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_IN_BASKET } from "../queries/getAllProductsInBasket";
import BasketItems from "../components/basket";
const Basket = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_IN_BASKET);
  if (data) {
    console.log(data);
  }
  return (
    <View>
      <BasketItems data={data}></BasketItems>
    </View>
  );
};

export default Basket;
