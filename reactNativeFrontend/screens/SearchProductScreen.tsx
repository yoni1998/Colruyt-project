import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ProductCard from '../components/ProductCard';
import {useDarkModeStore} from '../components/Settings';
import {themeStyle} from '../constants/Theme';
import Slider from '@react-native-community/slider';
import useProducts from '../hooks/useProducts';
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

  const {error, data} = useProducts({search, minPrice, maxPrice});

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
          placeholder="Search for products..."
        />
        <Text style={styles.maxPrice}>€ {maxPrice}</Text>
        <Slider
          accessibilityLabel="select the maximum price"
          onSlidingComplete={handleSliderChange}
          tapToSeek={true}
          style={{width: 300, height: 50}}
          minimumValue={0}
          maximumValue={50}
          value={50}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        {!search && <Text style={styles.emptyText}>Search for products</Text>}
        {data && (
          <SafeAreaView accessibilityLabel="a list of all available products that matches your search criteria">
            <FlatList
              keyExtractor={item => item._id}
              data={data.products}
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
