import {View, Text, StyleSheet, Button, Modal, TextInput} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToastWithGravity} from '../shared/Toast';
import useBaskets from '../hooks/useBasket';
import useAddProductToBasket from '../hooks/useAddProductToBasket';
import {queryClient} from '../constants/GraphqlAccess';
import useUpdateProductToBasket from '../hooks/useUpdateProductToBasket';

const ProductModal = ({item, setIsModalVisible, isEdit, editBasketId}: any) => {
  let [aantal, setAantal] = useState(1);
  const [basketId, setBasketId] = useState(null);

  const addProductToBasket = useAddProductToBasket({basketId});
  const updateProductToBasket = useUpdateProductToBasket();

  const {data} = useBaskets();

  const addToCard = (id: string) => {
    if (!isEdit) {
      if (aantal < 1) {
        showToastWithGravity('Amount need to be above 1');
      } else if (!basketId) {
        showToastWithGravity('You need to select a basket');
      } else {
        addProductToBasket.mutate({productId: id, aantal: aantal.toString()});
        setIsModalVisible(false);
        showToastWithGravity('het product is toegevoegd aan je winkelmandje');
      }
    }
    if (isEdit) {
      updateProductToBasket.mutate({
        productId: id,
        updateProductToBasketId: editBasketId,
        input: aantal.toString(),
      });
    }
  };

  if (addProductToBasket.isSuccess || updateProductToBasket.isSuccess) {
    queryClient.refetchQueries('baskets');
  }

  return (
    <Modal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Selecteer het aantal</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.quantityContainer}>
            <Icon
              name="minus"
              size={20}
              onPress={() => setAantal(aantal - 1)}
            />
            <TextInput style={styles.quantity}>
              {isEdit ? item.aantal : aantal}
            </TextInput>
            <Icon size={20} name="plus" onPress={() => setAantal(aantal + 1)} />
          </View>
          <View>
            <Text style={styles.text}>Selecteer het winkelmandje</Text>
            <View style={styles.dropdown}>
              <SelectDropdown
                disabled={isEdit ? true : false}
                data={data?.getAllBaskets}
                onSelect={selectedItem => {
                  console.log(selectedItem._id);
                  setBasketId(selectedItem._id);
                }}
                buttonTextAfterSelection={selectedItem => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.naam;
                }}
                // eslint-disable-next-line @typescript-eslint/no-shadow
                rowTextForSelection={item => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.naam;
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title="Toevoegen aan winkelmandje"
            onPress={() => addToCard(item._id)}
          />
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
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    marginTop: '50%',
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
    padding: 10,
    flexDirection: 'row',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginStart: 10,
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
export default ProductModal;
