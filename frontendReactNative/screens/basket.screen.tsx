import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_IN_BASKET } from "../queries/getAllProductsInBasket";
import BasketItems from "../components/basket";
const Basket = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_IN_BASKET);

  return (
    <View>
      <BasketItems data={data}></BasketItems>
    </View>
  );
};

export default Basket;
