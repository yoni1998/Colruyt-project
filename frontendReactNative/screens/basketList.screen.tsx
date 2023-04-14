import { View, Text } from "react-native";
import React from "react";
import { GET_ALL_BASKETS } from "../queries/basketQueries";
import { useQuery } from "@apollo/client";
import ShoppingCard from ".././components/shoppingCard";
const BasketList = () => {
  const { loading, error, data } = useQuery(GET_ALL_BASKETS);
  if (data) {
    return (
      <View>
        <ShoppingCard basketData={data.getAllBaskets}></ShoppingCard>
      </View>
    );
  }
};

export default BasketList;
