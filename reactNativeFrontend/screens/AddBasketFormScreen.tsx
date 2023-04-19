import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {useMutation} from '@apollo/client';
import {
  ADD_NEW_BASKET,
  GET_ALL_BASKETS,
  UPDATE_BASKET_ON_ID,
} from '../queries/basketQueries';
import {useNavigation} from '@react-navigation/native';
import {showToastWithGravity} from '../shared/Toast';

const AddBasketFormScreen = ({route}: any | null) => {
  const params = route?.params;
  const navigation = useNavigation();
  const [naam, setNaam] = useState('');
  const [imageBackground, setImageBackground] = useState('');

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
          naam: params?.basketData.naam ? params?.basketData.naam : '',
          imageBackground: params?.basketData.imageBackground
            ? params?.basketData.imageBackground
            : '',
        }}
        onSubmit={(values: any) => {
          setNaam(values.naam);
          setImageBackground(values.imageBackground);
          if (params?.basketData._id) {
            updateBasket().then(() => {
              showToastWithGravity(
                'Het wijzigen van een winkelmadje is gelukt',
              );
              navigation.goBack();
            });
          } else {
            addNewBasket().then(() => {
              showToastWithGravity(
                'Het toevoegen van een winkelmadje is gelukt',
              );
              navigation.goBack();
            });
          }
        }}>
        {formikProps => (
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name"
              onChangeText={formikProps.handleChange('naam')}
              value={formikProps.values.naam}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter background"
              onChangeText={formikProps.handleChange('imageBackground')}
              value={formikProps.values.imageBackground}
            />

            <Pressable onPress={formikProps.handleSubmit} style={styles.button}>
              {params?.basketData.naam && (
                <Text style={styles.text}>Basket Wijzigen</Text>
              )}
              {!params?.basketData.naam && (
                <Text style={styles.text}>Basket Aanmaken</Text>
              )}
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 350,
    fontSize: 23,
    height: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 50,
    margin: 10,
  },
  button: {
    marginTop: 40,
    padding: 15,
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddBasketFormScreen;
