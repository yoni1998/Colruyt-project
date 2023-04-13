import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home.screen";
import Basket from "../screens/basket.screen";
import SearchProducts from "../screens/searchProducts.screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductForm from "../screens/productForm.screen";
import { Icon } from "react-native-vector-icons/Icon";
import { IconButton } from "native-base";

const Navigation = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 25,
            },
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
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 25,
            },
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
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 25,
            },
            presentation: "modal",
            headerMode: "float",
            animationEnabled: true,
            headerStyle: {
              height: 150,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  };

  const FormsScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="products"
          component={ProductForm}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 25,
            },
            presentation: "modal",
            headerMode: "float",
            animationEnabled: true,
            headerStyle: {
              height: 150,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            return;
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        ></Tab.Screen>
        <Tab.Screen
          name="Products"
          component={FormsScreen}
          options={{ headerShown: false }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
