import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { ADD_NEW_BASKET, GET_ALL_BASKETS } from "../queries/basketQueries";
import { useMutation } from "@apollo/client";
const AddBasketScreen = () => {
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

  return (
    <View>
      <Formik
        initialValues={{ naam: "", imageBackground: "" }}
        onSubmit={(values: any) => {
          setNaam(values.naam);
          setImageBackground(values.imageBackground);
          addNewBasket().then((x) => {
            console.log("gelukt");
          });
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
