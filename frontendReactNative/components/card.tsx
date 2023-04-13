import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  ADD_PRODUCT_TO_BASKET,
  GET_PRODUCTS_IN_BASKET,
} from "../queries/getAllProductsInBasket";
import { useMutation } from "@apollo/client";
import { Pressable } from "native-base";
import { Modal } from "./modal";
const Card = ({ products }: any) => {
  const [id, setId] = useState("");
  const [aantal, setAantal] = useState(0);
  const [mutateFunction] = useMutation(ADD_PRODUCT_TO_BASKET, {
    variables: {
      input: {
        productId: id,
        aantal: "10",
      },
    },
    refetchQueries: () => [
      {
        query: GET_PRODUCTS_IN_BASKET,
      },
    ],
  });

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "het product is toegevoegd aan je winkelmandje",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  useEffect(() => {
    if (id) {
      mutateFunction()
        .then((x) => {
          showToastWithGravity();
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const addToCard = (id: any) => {
    setId(id);
  };

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  if (products) {
    return (
      <FlatList
        keyExtractor={(item) => item._id}
        data={products.getAllProducts}
        renderItem={({ item }: any) => (
          <View style={styles.container}>
            <View key={item.id} style={styles.itemContainer}>
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg",
                }}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.naam}</Text>
                <Text style={styles.price}>€ {item.prijs}.00</Text>
              </View>
              <Modal isVisible={isModalVisible}>
                <Modal.Container>
                  <Modal.Header title="Selecteer het aantal" />
                  <Modal.Body>
                    <View style={styles.quantityContainer}>
                      <Button title="-" onPress={() => setAantal(aantal - 1)} />
                      <TextInput style={styles.quantity}>{aantal}</TextInput>
                      <Button title="+" onPress={() => setAantal(aantal + 1)} />
                    </View>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button title="Close" onPress={handleModal} />
                    <Button
                      title="Toevoegen aan winkelmandje"
                      onPress={() => addToCard(item._id)}
                    />
                  </Modal.Footer>
                </Modal.Container>
              </Modal>
              <View style={styles.removeButton}>
                <Pressable onPress={handleModal}>
                  <Text>Add to card</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 100,
    marginTop: 20,
  },
  tittle: {
    fontSize: 24,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#fff",
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
    color: "#888",
  },
  removeButton: {
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    marginStart: 10,
  },
});

export default Card;
