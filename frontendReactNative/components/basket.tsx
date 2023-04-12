import { View, Text, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_PRODUCT_IN_BASKET,
  GET_PRODUCTS_IN_BASKET,
} from "../queries/getAllProductsInBasket";

const BasketItems = ({ data }: any) => {
  const [id, setId] = useState("");
  const [mutateFunction] = useMutation(DELETE_PRODUCT_IN_BASKET, {
    variables: {
      removeBasketId: id,
    },
    refetchQueries: () => [
      {
        query: GET_PRODUCTS_IN_BASKET,
      },
    ],
  });

  useEffect(() => {
    mutateFunction()
      .then((x) => {
        console.log(x);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteProduct = (id: any) => {
    setId(id);
  };

  if (data) {
    return (
      <View>
        <FlatList
          keyExtractor={(item) => item._id}
          data={data.getAllBaskets}
          renderItem={({ item }: any) => (
            <View>
              <Text>
                {item?.aantal} {item.productId}
              </Text>
              <Button
                title="verwijderen"
                onPress={() => deleteProduct(item._id)}
              ></Button>
            </View>
          )}
        />
      </View>
    );
  }
};

export default BasketItems;
