import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import {
  ADD_NEW_BASKET,
  GET_ALL_BASKETS,
  UPDATE_BASKET_ON_ID,
} from "../queries/basketQueries";
import { useMutation } from "@apollo/client";
const AddBasketScreen = ({ route }: any | null) => {
  const params = route?.params;
  const [naam, setNaam] = useState("");
  const [imageBackground, setImageBackground] = useState("");

  const [addNewBasket] = useMutation(ADD_NEW_BASKET, {
    variables: {
      input: {
        naam,
        imageBackground,
      },
    },
    refetchQueries: () => [
      {
        query: GET_ALL_BASKETS,
      },
    ],
  });

  const [updateBasket] = useMutation(UPDATE_BASKET_ON_ID, {
    variables: {
      updateBasketId: params?.basketData?._id,
      input: {
        naam,
        imageBackground,
      },
    },
    refetchQueries: () => [
      {
        query: GET_ALL_BASKETS,
      },
    ],
  });

  return (
    <View>
      <Formik
        initialValues={{
          naam: params?.basketData.naam ? params?.basketData.naam : "",
          imageBackground: params?.basketData.imageBackground
            ? params?.basketData.imageBackground
            : "",
        }}
        onSubmit={(values: any) => {
          setNaam(values.naam);
          setImageBackground(values.imageBackground);
          if (params?.basketData._id) {
            updateBasket().then((x) => {
              console.log("updaten gelukt");
            });
          } else {
            addNewBasket().then((x) => {
              console.log("toevoegen gelukt");
            });
          }
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name"
              onChangeText={formikProps.handleChange("naam")}
              value={formikProps.values.naam}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Enter background"
              onChangeText={formikProps.handleChange("imageBackground")}
              value={formikProps.values.imageBackground}
            ></TextInput>
            <Button
              title="submit"
              onPress={formikProps.handleSubmit}
              color="maroon"
            ></Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {},
});

export default AddBasketScreen;
