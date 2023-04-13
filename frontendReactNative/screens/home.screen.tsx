import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Stack } from "native-base";
import ShoppingCard from "../components/shoppingCard";
import { useNavigation } from "@react-navigation/native";
const Home: FC = () => {
  const navigation: any = useNavigation();

  return (
    <>
      <View>
        <Stack
          style={{ margin: 30 }}
          onTouchStart={() => navigation.navigate("search")}
        >
          <Input
            isReadOnly={true}
            style={styles.input}
            w="100%"
            size="2xl"
            placeholder="Zoeken naar producten..."
          />
        </Stack>
        <ShoppingCard></ShoppingCard>
      </View>
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
