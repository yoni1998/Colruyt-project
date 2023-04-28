import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchProductScreen from '../screens/SearchProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import BasketListScreen from '../screens/BasketListScreen';
import AddBasketFormScreen from '../screens/AddBasketFormScreen';
import BasketItemScreen from '../screens/BasketItemScreen';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../components/Settings';
import {colors} from '../constants/Colors';
const Navigation = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const options = {
    headerTitleStyle: {
      fontSize: 25,
    },
    headerStyle: {
      height: 80,
      backgroundColor: colors.primary,
      shadowColor: '#000',
      elevation: 25,
    },
  };

  const HomeStack = ({navigation}: any) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            ...options,
            headerRight: () => (
              <Icon
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginRight: 30}}
                name="gear"
                onPress={() => navigation.navigate('Settings')}
                size={30}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchProductScreen}
          options={{
            headerTitleAlign: 'center',
            presentation: 'modal',
            headerMode: 'float',
            ...options,
          }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={({route}: any) => ({
            title: route?.params?.productDetails?.naam,
            headerTitleAlign: 'center',
            ...options,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitleAlign: 'center',
            presentation: 'modal',
            headerMode: 'float',
            ...options,
          }}
        />
      </Stack.Navigator>
    );
  };

  const BasketStack = ({navigation}: any) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Baskets"
          component={BasketListScreen}
          options={{
            headerTitleAlign: 'center',
            ...options,
            headerRight: () => (
              <Icon
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginRight: 30}}
                name="plus"
                onPress={() => navigation.navigate('Basket factory')}
                size={30}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Basket"
          component={BasketItemScreen}
          options={{headerTitleAlign: 'center', ...options}}
        />
        <Stack.Screen
          name="Basket factory"
          component={AddBasketFormScreen}
          options={{headerTitleAlign: 'center', ...options}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={({route}: any) => ({
            title: route?.params?.productDetails?.naam,
            headerTitleAlign: 'center',
            ...options,
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({tintColor}: any) => {
            if (route.name === 'Search Products') {
              return <Icon name="search" size={30} color={tintColor} />;
            } else {
              return (
                <Icon name="shopping-basket" size={30} color={tintColor} />
              );
            }
          },
        })}>
        <Tab.Screen
          name="Search Products"
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="My Baskets"
          component={BasketStack}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
