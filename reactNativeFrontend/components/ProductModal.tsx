import {View, Text, StyleSheet, Button, Modal, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ADD_PRODUCT_TO_BASKET,
  GET_ALL_BASKETS,
  GET_BASKET_ON_ID,
} from '../queries/basketQueries';
import {useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToastWithGravity} from '../shared/Toast';

const ProductModal = ({item}: any) => {
  const [id, setId] = useState('');
  const [aantal, setAantal] = useState(1);
  const [basketId, setBasketId] = useState(null);
  const navigation = useNavigation() as any;
  const [mutateFunction] = useMutation(ADD_PRODUCT_TO_BASKET, {
    variables: {
      addProductToBasketId: basketId,
      input: {
        productId: id,
        aantal: aantal.toString(),
      },
    },
    refetchQueries: () => [
      {
        query: GET_ALL_BASKETS,
      },
    ],
  });

  const {data} = useQuery(GET_ALL_BASKETS);

  useEffect(() => {
    if (id) {
      mutateFunction()
        .then(() => {
          showToastWithGravity('het product is toegevoegd aan je winkelmandje');
          navigation.goBack();
        })
        .catch(err => console.error(err));
    }
  }, [id, mutateFunction, navigation]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const addToCard = (id: any) => {
    setId(id);
  };

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
            <TextInput style={styles.quantity}>{aantal}</TextInput>
            <Icon size={20} name="plus" onPress={() => setAantal(aantal + 1)} />
          </View>
          <View>
            <Text style={styles.text}>Selecteer het winkelmandje</Text>
            <View style={styles.dropdown}>
              <SelectDropdown
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
            onPress={() => navigation.goBack()}
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
