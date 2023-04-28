import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {useDarkModeStore} from '../hooks/useDarkModeStore';
import {themeStyle} from '../constants/Theme';
const ProductDetailsScreen = ({route}: any) => {
  const {productDetails} = route.params;
  const {isDarkMode}: any | boolean = useDarkModeStore();

  return (
    <View
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }
      accessible={true}>
      <ImageBackground
        source={{
          uri: productDetails.productImage
            ? productDetails.productImage
            : 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
        }}
        style={styles.image}
      />
      <View accessibilityLabel="product details">
        <Text accessibilityLabel="name field" style={styles.textHeader}>
          Naam
        </Text>
        <Text style={styles.details}>{productDetails?.naam}</Text>
        <Text accessibilityLabel="price field" style={styles.textHeader}>
          Prijs
        </Text>
        <Text style={styles.details}>€ {productDetails?.prijs}.00/ each</Text>
        <Text style={styles.textHeader} accessibilityLabel="kcal field">
          kcal
        </Text>
        <Text style={styles.details}>{productDetails?.kcal}</Text>
        <Text style={styles.textHeader} accessibilityLabel="in stock field">
          Available
        </Text>
        <Text style={styles.details}>
          {productDetails?.inStock ? 'In stock' : 'Not in stock'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textHeader: {
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#000000',
    fontSize: 23,
  },
  details: {
    borderColor: '#ccc',
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    fontSize: 23,
  },
});

export default ProductDetailsScreen;
