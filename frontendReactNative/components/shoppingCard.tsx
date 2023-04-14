import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "native-base";
const ShoppingCard = ({ basketData }: any) => {
  const navigation = useNavigation() as any;

  return (
    <View>
      <FlatList
        keyExtractor={(item: any) => item._id}
        data={basketData}
        renderItem={({ item }: any) => (
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
});

export default ShoppingCard;
