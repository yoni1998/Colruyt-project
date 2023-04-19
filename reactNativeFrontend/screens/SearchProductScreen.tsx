import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_PRODUCTS} from '../queries/productQueries';
import ProductCard from '../components/ProductCard';

const SearchProductScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const textInputRef: any = React.useRef();
  const handleChange = (text: string) => {
    setSearch(text);
  };

  const {error, data} = useQuery(GET_PRODUCTS, {
    variables: {search},
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        ref={textInputRef}
        onChangeText={handleChange}
        placeholder="Zoeken naar producten..."
      />
      {!search && <Text style={styles.emptyText}>Zoeken naar producten</Text>}
      {data && (
        <SafeAreaView>
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
});
export default SearchProductScreen;
