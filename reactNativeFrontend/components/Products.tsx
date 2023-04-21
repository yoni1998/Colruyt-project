import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {
  DELETE_PRODUCT_IN_BASKET,
  GET_ALL_BASKETS,
} from '../queries/basketQueries';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToastWithGravity} from '../shared/Toast';

const Products = ({products, productKey, basketId}: any) => {
  const navigation = useNavigation() as any;
  const [id, setId] = useState('');
  const [mutateFunction] = useMutation(DELETE_PRODUCT_IN_BASKET, {
    variables: {
      removeProductFromBasketId: basketId,
      productId: id,
    },
    refetchQueries: () => [
      {
        query: GET_ALL_BASKETS,
      },
    ],
  });

  useEffect(() => {
    if (id) {
      mutateFunction()
        .then(() => {
          showToastWithGravity('Het product is verwijderd uit je winkelmandje');
        })
        .catch(err => console.log(err));
    }
  }, [id, mutateFunction]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const deleteProduct = (id: any) => {
    setId(id);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderRightActions = (id: any) => {
    return (
      <RectButton onPress={() => deleteProduct(id)} style={styles.rightAction}>
        <Icon name="trash" color="white" size={35} />
      </RectButton>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderLeftActions = (id: any) => {
    return (
      <RectButton onPress={() => deleteProduct(id)} style={styles.leftAction}>
        <Icon name="edit" color="white" size={35} />
      </RectButton>
    );
  };
  return (
    <View>
      <Swipeable
        renderRightActions={() => renderRightActions(products._id)}
        renderLeftActions={() => renderLeftActions(products._id)}
        key={productKey}>
        {products.productId && (
          <View style={styles.container}>
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
                      productDetails: products.productId,
                    })
                  }>
                  <Text style={styles.name}>{products.productId?.naam}</Text>
                  <Text style={styles.price}>
                    € {products.productId?.prijs}.00
                  </Text>
                </Pressable>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityTitle}>Aantal</Text>
                <Text style={styles.quantity}>{products?.aantal}</Text>
              </View>
            </View>
          </View>
        )}
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 100,
    marginTop: 20,
  },
  tittle: {
    fontSize: 24,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#cccccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    height: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 22,
  },
  price: {
    fontSize: 20,
    color: '#888',
  },
  removeButton: {
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  quantity: {
    fontSize: 20,
    paddingLeft: 10,
  },
  quantityTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  leftAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3b3bf6',
  },

  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ee0303',
  },
});

export default Products;
