import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { Container, List } from "native-base";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_ON_ID } from "../queries/productQueries";

const ProductDetails = ({ route }: any) => {
  const { productId } = route.params;

  const { data, loading, error } = useQuery(GET_PRODUCT_ON_ID, {
    variables: {
      getProductId: productId,
    },
  });

  if (error) {
    console.log(error);
    console.log(productId);
  }

  if (data) {
    console.log(productId);
    return (
      <ScrollView>
        <Container style={{ height: "100%" }}>
          <List style={styles.container}>
            <ImageBackground
              source={{
                uri: "https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg",
              }}
              style={styles.image}
            ></ImageBackground>
            <View style={styles.container}>
              <Text style={styles.textHeader}>Naam</Text>
              <Text style={styles.details}>{data.getProduct.DATA.naam}</Text>
              <Text style={styles.textHeader}>Prijs</Text>
              <Text style={styles.details}>
                {data.getProduct.DATA.prijs} euro
              </Text>
              <Text style={styles.textHeader}>kcal</Text>
              <Text style={styles.details}>{data.getProduct.DATA?.kcal}</Text>
              <Text style={styles.textHeader}>In stock</Text>
              <Text style={styles.details}>
                {data.getProduct.DATA?.inStock}
              </Text>
            </View>
          </List>
        </Container>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginLeft: 40,
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
  },
  textHeader: {
    fontSize: 26,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default ProductDetails;
