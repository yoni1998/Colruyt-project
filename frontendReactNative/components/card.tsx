import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

const Card = ({ data }: any) => {
  if (data) {
    return (
      <FlatList
        data={data.getAllProducts}
        renderItem={({ item }: any) => (
          <Text style={styles.item}>{item?.naam}</Text>
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
