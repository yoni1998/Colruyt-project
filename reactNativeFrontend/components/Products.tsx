import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import {showToastWithGravity} from '../shared/Toast';
import ProductModal from './ProductModal';
import useDeleteProductInBasket from '../hooks/useDeleteProductInBasket';
import {queryClient} from '../constants/GraphqlAccess';
import {renderLeftActions, renderRightActions} from '../shared/Swipeable';

const Products = ({products, productKey, basketId}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation() as any;
  const deleteProductInBasket = useDeleteProductInBasket();

  const deleteProduct = (id: number) => {
    deleteProductInBasket.mutate({
      basketId,
      id,
    });
    showToastWithGravity('Het product is verwijderd uit je winkelmandje');
  };

  if (deleteProductInBasket.isSuccess) {
    queryClient.refetchQueries('basket');
  }

  return (
    <View>
      <Swipeable
        renderRightActions={() => renderRightActions()}
        renderLeftActions={() => renderLeftActions()}
        onSwipeableRightOpen={() => deleteProduct(products._id)}
        onSwipeableLeftOpen={() => setIsModalVisible(true)}
        key={productKey}>
        {products.productId && (
          <View style={styles.container}>
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: products.productId?.productImage
                    ? products.productId?.productImage
                    : 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
                }}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Pressable
                  onPress={() =>
                    basketId
                      ? navigation.navigate('ProductDetails', {
                          productDetails: products.productId,
                        })
                      : navigation.navigate('Details', {
                          productDetails: products.productId,
                        })
                  }>
                  <Text style={styles.name}>{products.productId?.name}</Text>
                  <Text style={styles.price}>
                    € {products.productId?.price}.00 /each
                  </Text>
                </Pressable>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityTitle}>Amount</Text>
                <Text style={styles.quantity}>{products?.amount}</Text>
              </View>
            </View>
          </View>
        )}
      </Swipeable>
      {isModalVisible && (
        <ProductModal
          editBasketId={basketId}
          item={products}
          setIsModalVisible={setIsModalVisible}
          isEdit={true}
        />
      )}
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
});

export default Products;
