import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';

const ProductDetailsScreen = ({route}: any) => {
  const {productDetails} = route.params;
  return (
    <View>
      <ImageBackground
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
        }}
        style={styles.image}
      />
      <View>
        <Text style={styles.textHeader}>Naam</Text>
        <Text style={styles.details}>{productDetails?.naam}</Text>
        <Text style={styles.textHeader}>Prijs</Text>
        <Text style={styles.details}>€ {productDetails?.prijs}.00</Text>
        <Text style={styles.textHeader}>kcal</Text>
        <Text style={styles.details}>{productDetails?.kcal}</Text>
        <Text style={styles.textHeader}>In stock</Text>
        <Text style={styles.details}>{productDetails?.inStock}</Text>
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
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    fontSize: 23,
  },
  details: {
    marginLeft: 30,
    fontSize: 20,
  },
});

export default ProductDetailsScreen;
