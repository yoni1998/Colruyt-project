import {View, Text, StyleSheet, Button, Modal, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToastWithGravity} from '../shared/Toast';
import useBaskets from '../hooks/useBasket';
import useAddProductToBasket from '../hooks/useAddProductToBasket';
import {queryClient} from '../constants/GraphqlAccess';
import useUpdateProductToBasket from '../hooks/useUpdateProductToBasket';

const ProductModal = ({item, setIsModalVisible, isEdit, editBasketId}: any) => {
  const [amount, setAmount] = useState(1);
  const [basketId, setBasketId] = useState(null);

  const addProductToBasket = useAddProductToBasket({basketId});
  const updateProductToBasket = useUpdateProductToBasket();

  const {data} = useBaskets();

  const addToCard = (id: string) => {
    if (!isEdit) {
      if (amount < 1) {
        showToastWithGravity('Amount need to be above 1');
      } else if (!basketId) {
        showToastWithGravity('You need to select a basket');
      } else {
        addProductToBasket.mutate({productId: id, amount: amount});
      }
    }
    if (isEdit) {
      if (amount < 1) {
        showToastWithGravity('Amount need to be above 1');
      } else {
        updateProductToBasket.mutate({
          productId: id,
          updateProductToBasketId: editBasketId,
          input: amount,
        });
      }
    }
  };

  if (updateProductToBasket.isSuccess) {
    queryClient.refetchQueries('basket').then(() => {
      showToastWithGravity('het product is aangepast in je winkelmandje');
      setIsModalVisible(false);
    });
  }

  if (addProductToBasket.isSuccess) {
    queryClient.refetchQueries('basket').then(() => {
      showToastWithGravity('het product is toegevoegd aan je winkelmandje');
      setIsModalVisible(false);
    });
  }

  useEffect(() => {
    if (isEdit) {
      setAmount(Number(item?.amount));
    }
  }, [isEdit, item.amount]);

  return (
    <Modal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Select the amount</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.quantityContainer}>
            <Icon
              name="minus"
              size={25}
              onPress={() => setAmount(amount - 1)}
            />
            <TextInput style={styles.quantity}>{amount}</TextInput>
            <Icon
              size={25}
              style={styles.plusIcon}
              name="plus"
              onPress={() => setAmount(amount + 1)}
            />
          </View>
          <View>
            <Text style={styles.text}>Selecteer het winkelmandje</Text>
            <View style={styles.dropdown}>
              <SelectDropdown
                disabled={isEdit ? true : false}
                data={data?.baskets}
                onSelect={selectedItem => setBasketId(selectedItem._id)}
                buttonTextAfterSelection={selectedItem => selectedItem.name}
                rowTextForSelection={textItem => textItem.name}
              />
            </View>
          </View>
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
