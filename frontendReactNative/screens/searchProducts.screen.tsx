import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Stack } from "native-base";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries/getAllProducts";
import Card from "../components/card";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchProducts = ({ navigation }: any) => {
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

  const textInputRef: any = React.useRef();
  useEffect(() => {
    if (textInputRef.current) {
      const unsubscribe = navigation.addListener("focus", () => {
        setTimeout(() => {
          textInputRef.current?.focus();
        }, 300);
      });

      return unsubscribe;
    }
  }, [navigation, textInputRef.current]);

  return (
    <View>
      <Stack style={{ margin: 30 }}>
        <Input
          style={styles.input}
          value={search}
          w="100%"
          ref={textInputRef}
          size="2xl"
          onChangeText={handleChange}
          placeholder="Zoeken naar producten..."
        />
      </Stack>
      {!search && <Text style={styles.emptyText}>Zoeken naar producten</Text>}
      <SafeAreaView>
        <Card products={data}></Card>
      </SafeAreaView>
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
  emptyText: {
    fontSize: 20,
    marginLeft: 100,
  },
});

export default SearchProducts;
