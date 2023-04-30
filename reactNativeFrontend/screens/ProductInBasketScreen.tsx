import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ProductsInBasket from '../components/ProductsInBasket';
import {useDarkModeStore} from '../hooks/useDarkModeStore';
import {themeStyle} from '../constants/Theme';
import Loading from '../shared/Loading';
import useBasket from '../hooks/useBasket';
import Error from '../shared/Error';
const ProductInBasketScreen = ({route}: any) => {
  const {basketId} = route.params;
  const {isDarkMode}: any | boolean = useDarkModeStore();

  const {error, isLoading, data} = useBasket({basketId});

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <View
      accessible={true}
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }>
      {data && (
        <FlatList
          accessibilityLabel="list of all products in the basket"
          keyExtractor={(item: any) => item._id}
          data={data.basket.products}
          renderItem={({item}: any) => (
            <ProductsInBasket
              products={item}
              productKey={item._id}
              basketId={basketId}
            />
          )}
        />
      )}
      {!data?.basket?.products.length && (
        <View
          style={styles.noProductsContainer}
          accessibilityLabel="no products in this basket found">
          <Text style={styles.text}>No product found in this basket</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noProductsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '100%',
  },
  text: {
    fontSize: 18,
  },
});

export default ProductInBasketScreen;
