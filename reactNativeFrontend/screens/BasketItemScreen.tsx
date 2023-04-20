import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {GET_BASKET_ON_ID} from '../queries/basketQueries';
import {useQuery} from '@apollo/client';
import Products from '../components/Products';
import {useDarkModeStore} from '../components/Settings';
import {themeStyle} from '../constants/Theme';
const BasketItemScreen = ({route}: any) => {
  const {basketId} = route.params;
  const {isDarkMode}: any | boolean = useDarkModeStore();
  const {data, loading, error} = useQuery(GET_BASKET_ON_ID, {
    variables: {
      getBasketId: basketId,
    },
  });

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <View
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }>
      {data && (
        <FlatList
          keyExtractor={(item: any) => item._id}
          data={data.getBasket.DATA.products}
          renderItem={({item}: any) => (
            <Products
              products={item}
              productKey={item._id}
              basketId={basketId}
            />
          )}
        />
      )}
      {!data.getBasket.DATA.products.length && (
        <View style={styles.noProductsContainer}>
          <Text style={styles.text}>
            Geen producten in dit winkelmandje gevonden
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noProductsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  text: {
    fontSize: 18,
  },
});

export default BasketItemScreen;
