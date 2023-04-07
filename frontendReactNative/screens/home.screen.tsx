import React, { FC, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Card, Input, Stack } from "native-base";
const Home: FC = () => {
  const [search, setSearch] = useState("");
  const handleChange = (text: any) => {
    setSearch(text);
  };
  return (
    <>
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
      <Card></Card>
    </>
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
export default Home;
