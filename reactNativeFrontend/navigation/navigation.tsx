import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SearchProductScreen from '../screens/SearchProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import BasketListScreen from '../screens/BasketListScreen';
import AddBasketFormScreen from '../screens/AddBasketFormScreen';
import BasketItemScreen from '../screens/BasketItemScreen';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../components/Settings';

const Navigation = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerStyle: {
              height: 60,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchProductScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            presentation: 'modal',
            headerMode: 'float',
            animationEnabled: true,
            headerStyle: {
              height: 60,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerStyle: {
              height: 60,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25,
            },
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
            headerTitleStyle: {
              fontSize: 25,
            },
            presentation: 'modal',
            headerMode: 'float',
            animationEnabled: true,
            headerStyle: {
              height: 60,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25,
            },
            headerRight: () => (
              <Icon
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginRight: 30}}
                name="plus"
                onPress={() => navigation.navigate('AddBasketForm')}
                size={30}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Basket"
          component={BasketItemScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerStyle: {
              height: 60,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="AddBasketForm"
          component={AddBasketFormScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerStyle: {
              height: 60,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
            headerStyle: {
              height: 60,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  };
  const HomeTab = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({tintColor}: any) => {
            if (route.name === 'HomeTab') {
              return <Icon name="search" size={30} color={tintColor} />;
            } else {
              return (
                <Icon name="shopping-basket" size={30} color={tintColor} />
              );
            }
          },
        })}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="BasketsTab"
          component={BasketStack}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerTitle() {
            null;
          },
          headerStyle: {backgroundColor: '#00e4d0'},
        }}>
        <Drawer.Screen name="HomePage" component={HomeTab} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
