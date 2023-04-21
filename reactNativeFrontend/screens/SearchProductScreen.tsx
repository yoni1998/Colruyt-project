import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_PRODUCTS} from '../queries/productQueries';
import ProductCard from '../components/ProductCard';
import {useDarkModeStore} from '../components/Settings';
import {themeStyle} from '../constants/Theme';
import Slider from '@react-native-community/slider';
const SearchProductScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const [minPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('50');
  const textInputRef: any = useRef();
  const {isDarkMode}: any | boolean = useDarkModeStore();
  const handleChange = (text: string) => {
    setSearch(text);
  };

  const handleSliderChange = (event: any) => {
    let roundedMaxprice = parseInt(event, 10);
    setMaxPrice(roundedMaxprice.toString());
  };

  const {error, data} = useQuery(GET_PRODUCTS, {
    variables: {search, minPrice, maxPrice},
  });

  useEffect(() => {
    if (textInputRef.current) {
      const unsubscribe = navigation.addListener('focus', () => {
        setTimeout(() => {
          textInputRef.current?.focus();
        }, 300);
      });

      return unsubscribe;
    }
  }, [navigation]);

  if (error) {
    console.log(error);
  }

  return (
    <View
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }
      accessible={true}>
      <View style={styles.container}>
        <TextInput
          accessibilityLabel="give some input to find products"
          style={styles.input}
          value={search}
          ref={textInputRef}
          onChangeText={handleChange}
          placeholder="Zoeken naar producten..."
        />
        <Text style={styles.maxPrice}>€ {maxPrice}</Text>
        <Slider
          accessibilityLabel="select the maximum price"
          onSlidingComplete={handleSliderChange}
          tapToSeek={true}
          style={{width: 300, height: 50}}
          minimumValue={50}
          maximumValue={0}
          value={50}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        {!search && <Text style={styles.emptyText}>Zoeken naar producten</Text>}
        {data && (
          <SafeAreaView accessibilityLabel="a list of all available products that matches your search criteria">
            <FlatList
              keyExtractor={item => item._id}
              data={data.getAllProducts}
              renderItem={({item}: any) => (
                <ProductCard product={item} productKey={item._id} />
              )}
            />
          </SafeAreaView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    marginTop: 30,
    width: 350,
    fontSize: 23,
    height: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  emptyText: {
    fontSize: 20,
    marginTop: 20,
  },
  maxPrice: {
    marginTop: 40,
    fontSize: 20,
  },
});
export default SearchProductScreen;
