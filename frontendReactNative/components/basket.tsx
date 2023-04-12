import { View, Text, FlatList } from "react-native";
import React from "react";

const BasketItems = ({ data }: any) => {
  if (data) {
    return (
      <View>
        <FlatList
          data={data.getAllBaskets}
          renderItem={({ item }: any) => (
            <Text>
              {item?.aantal} {item.productId}
            </Text>
          )}
        />
      </View>
    );
  }
};

export default BasketItems;
