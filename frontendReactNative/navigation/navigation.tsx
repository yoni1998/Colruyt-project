import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home.screen";
import Basket from "../screens/basket.screen";
import SearchProducts from "../screens/searchProducts.screen";

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="basket"
          component={Basket}
          options={{
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="search"
          component={SearchProducts}
          options={{
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
