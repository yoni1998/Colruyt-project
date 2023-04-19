import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProductModal from './ProductModal';

const ProductCard = ({product, productKey}: any) => {
  const navigation = useNavigation() as any;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  return (
    <View style={styles.container} key={productKey}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
          }}
          style={styles.image}
        />

        <View style={styles.infoContainer}>
          <Pressable
            onPress={() =>
              navigation.navigate('Details', {
                productDetails: product,
              })
            }>
            <Text style={styles.name}>{product.naam}</Text>
            <Text style={styles.price}>€ {product.prijs}.00</Text>
          </Pressable>
        </View>
        {isModalVisible && <ProductModal item={product} />}

        <View style={styles.button}>
          <Pressable onPress={handleModal}>
            <Text>Add to card</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  tittle: {
    fontSize: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width: 400,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginLeft: 10,
  },
  infoContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 22,
  },
  price: {
    fontSize: 20,
    color: '#888',
  },
  button: {
    marginLeft: 150,
  },
});

export default ProductCard;
