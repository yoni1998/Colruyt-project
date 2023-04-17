import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT_IN_BASKET } from "../queries/getAllProductsInBasket";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { GET_ALL_BASKETS, GET_BASKET_ON_ID } from "../queries/basketQueries";
import { useNavigation } from "@react-navigation/native";

const BasketItems = ({ route }: any) => {
  const navigation = useNavigation();
  const { basketId } = route.params;
  const [id, setId] = useState("");

  const { data, loading, error } = useQuery(GET_BASKET_ON_ID, {
    variables: {
      getBasketId: basketId,
    },
  });

  const [mutateFunction] = useMutation(DELETE_PRODUCT_IN_BASKET, {
    variables: {
      removeProductFromBasketId: basketId,
      productId: id,
    },
    refetchQueries: () => [
      {
        query: GET_ALL_BASKETS,
      },
    ],
  });

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "het product is verwijderd uit je winkelmandje",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  useEffect(() => {
    if (id) {
      mutateFunction()
        .then((x) => {
          showToastWithGravity();
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const deleteProduct = (id: any) => {
    console.log(data.getBasket.DATA._id);
    setId(id);
  };

  const renderRightActions = (id: any) => {
    return (
      <RectButton onPress={() => deleteProduct(id)} style={styles.rightAction}>
        <Animated.Text>Verwijderen</Animated.Text>
      </RectButton>
    );
  };

  const renderLeftActions = (id: any) => {
    return (
      <RectButton onPress={() => deleteProduct(id)} style={styles.leftAction}>
        <Animated.Text>Wijzigen</Animated.Text>
      </RectButton>
    );
  };

  if (data?.getBasket?.DATA.products) {
    return (
      <View>
        <FlatList
          keyExtractor={(item) => item._id}
          data={data.getBasket.DATA.products}
          renderItem={({ item }: any) => (
            <Swipeable
              renderRightActions={() => renderRightActions(item._id)}
              renderLeftActions={() => renderLeftActions(item._id)}
              key={item._id}
            >
              {item.productId && (
                <View style={styles.container}>
                  <View style={styles.itemContainer}>
                    <Image
                      source={{
                        uri: "https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg",
                      }}
                      style={styles.image}
                    />
                    <View style={styles.infoContainer}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("productDetails", {
                            productId: item.productId?._id,
                          })
                        }
                      >
                        <Text style={styles.name}>{item.productId?.naam}</Text>
                        <Text style={styles.price}>
                          € {item.productId?.prijs}.00
                        </Text>
                      </Pressable>
                    </View>
                    <View style={styles.quantityContainer}>
                      <Text style={{ fontWeight: "bold" }}>Aantal</Text>
                      <Text style={styles.quantity}>{item?.aantal}</Text>
                    </View>
                  </View>
                </View>
              )}
            </Swipeable>
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 100,
    marginTop: 20,
  },
  tittle: {
    fontSize: 24,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    height: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 22,
  },
  price: {
    fontSize: 20,
    color: "#888",
  },
  removeButton: {
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  quantity: {
    marginRight: 30,
    fontSize: 18,
  },
  leftAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1ea2df",
  },

  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ee0303",
  },
});

export default BasketItems;
