import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Stack } from "native-base";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries/getAllProducts";
import Card from "../components/card";

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const handleChange = (text: any) => {
    setSearch(text);
  };

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { search },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <View>
      <Stack style={{ margin: 30 }}>
        <Input
          style={styles.input}
          value={search}
          w="100%"
          size="2xl"
          onChangeText={handleChange}
          placeholder="Zoeken naar producten..."
        />
      </Stack>
      {!search && <Text>Zoeken naar producten</Text>}
      <Card products={data}></Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#5a8cab",
  },
  input: {
    width: 350,
    fontSize: 23,
    height: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
});

export default SearchProducts;
