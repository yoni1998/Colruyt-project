import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "native-base";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useMutation } from "@apollo/client";
import { GET_ALL_BASKETS, REMOVE_BASKET_ON_ID } from "../queries/basketQueries";
const ShoppingCard = ({ basketData }: any) => {
  const navigation = useNavigation() as any;
  const [basketId, setBasketId] = useState("");

  const [deleteBasket] = useMutation(REMOVE_BASKET_ON_ID, {
    variables: {
      removeBasketId: basketId,
    },
    refetchQueries: () => [
      {
        query: GET_ALL_BASKETS,
      },
    ],
  });

  const renderRightActions = (id: any) => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          setBasketId(id);
          deleteBasket()
            .then(() => console.log("deleted"))
            .catch((err) => console.log(err));
        }}
      >
        <Animated.Text>Verwijderen</Animated.Text>
      </RectButton>
    );
  };

  const renderLeftActions = (item: any) => {
    return (
      <RectButton
        style={styles.leftAction}
        onPress={() =>
          navigation.navigate("AddBasketForm", { basketData: item })
        }
      >
        <Animated.Text>Wijzigen</Animated.Text>
      </RectButton>
    );
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item: any) => item._id}
        data={basketData}
        renderItem={({ item }: any) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item._id)}
            renderLeftActions={() => renderLeftActions(item)}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("basket", { basketId: item._id })
              }
            >
              <ImageBackground
                source={{
                  uri: "https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg",
                }}
                style={styles.catoImage}
              >
                <View style={styles.gridContainer}>
                  <Text style={styles.textStyle} numberOfLines={2}>
                    {item.naam}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  );
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
  catoImage: {
    width: "100%",
    justifyContent: "flex-end",
    height: 120,
  },
  gridContainer: {},
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },

  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1c1c1c",
    backgroundColor: "#ffffff80",
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ee0303",
  },
  leftAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1ea2df",
  },
});

export default ShoppingCard;
