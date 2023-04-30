import {View, Text, StyleSheet, Button, Modal, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToastWithGravity} from '../shared/Toast';
import useBaskets from '../hooks/useBaskets';
import useAddProductToBasket from '../hooks/useAddProductToBasket';
import {queryClient} from '../constants/GraphqlAccess';
import useUpdateProductToBasket from '../hooks/useUpdateProductToBasket';
import Products from '../interfaces/Products.interface';

interface ProductModalProps {
  item: Products;
  setIsModalVisible: any;
  isEdit: boolean;
  editBasketId: string;
}

const ProductModal = ({
  item,
  setIsModalVisible,
  isEdit,
  editBasketId,
}: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [basketId, setBasketId] = useState(null);

  const addProductToBasket = useAddProductToBasket();
  const updateProductToBasket = useUpdateProductToBasket();

  const {data} = useBaskets();

  const addToCard = (productId: any) => {
    if (!isEdit) {
      if (quantity < 1) {
        showToastWithGravity('Quantity need to be above 1');
      } else if (!basketId) {
        showToastWithGravity('You need to select a basket');
      } else {
        addProductToBasket.mutate({productId, quantity, basketId});
      }
    }
    if (isEdit) {
      if (quantity < 1) {
        showToastWithGravity('quantity need to be above 1');
      } else {
        updateProductToBasket.mutate({
          productId,
          basketId: editBasketId,
          input: quantity,
        });
        showToastWithGravity('The product is modified in the basket');
      }
    }
  };

  if (updateProductToBasket.isSuccess) {
    queryClient.refetchQueries('basket').then(() => {
      setIsModalVisible(false);
    });
  }

  if (addProductToBasket.isSuccess) {
    queryClient.refetchQueries('basket').then(() => {
      showToastWithGravity('The product is added to the basket');
      setIsModalVisible(false);
    });
  }

  useEffect(() => {
    if (isEdit) {
      setQuantity(Number(item?.quantity));
    }
  }, [isEdit, item.quantity]);

  return (
    <Modal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Select the quantity</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.quantityContainer}>
            <Icon
              name="minus"
              size={25}
              onPress={() => setQuantity(quantity - 1)}
            />
            <TextInput style={styles.quantity}>{quantity}</TextInput>
            <Icon
              size={25}
              style={styles.plusIcon}
              name="plus"
              onPress={() => setQuantity(quantity + 1)}
            />
          </View>

          {!isEdit && (
            <View>
              <Text style={styles.text}>Select the basket</Text>
              <View style={styles.dropdown}>
                <SelectDropdown
                  data={data?.baskets}
                  onSelect={selectedItem => setBasketId(selectedItem._id)}
                  buttonTextAfterSelection={selectedItem => selectedItem.name}
                  rowTextForSelection={textItem => textItem.name}
                />
              </View>
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <Button title="Add to basket" onPress={() => addToCard(item._id)} />
        </View>
        <View style={styles.footer}>
          <Button
            color="red"
            title="Close"
            onPress={() => setIsModalVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFCFF',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  plusIcon: {
    paddingLeft: 4,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  body: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginStart: 10,
    fontSize: 25,
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
export default ProductModal;
