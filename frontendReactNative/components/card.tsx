import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ADD_PRODUCT_TO_BASKET,
  GET_PRODUCTS_IN_BASKET,
} from "../queries/getAllProductsInBasket";
import { useMutation } from "@apollo/client";

const Card = ({ products }: any) => {
  const [id, setId] = useState("");

  const [mutateFunction] = useMutation(ADD_PRODUCT_TO_BASKET, {
    variables: {
      input: {
        productId: id,
        aantal: "10",
      },
    },
    refetchQueries: () => [
      {
        query: GET_PRODUCTS_IN_BASKET,
      },
    ],
  });

  useEffect(() => {
    if (id) {
      mutateFunction()
        .then((x) => {
          console.log(x);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const addToCard = (id: any) => {
    if (id) {
      setId(id);
    }
  };

  if (products) {
    return (
      <FlatList
        keyExtractor={(item) => item._id}
        data={products.getAllProducts}
        renderItem={({ item }: any) => (
          <View>
            <Text style={styles.item}>{item?.naam}</Text>
            <Button
              title="Add to card"
              onPress={() => addToCard(item._id)}
            ></Button>
          </View>
        )}
      />
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Card;
