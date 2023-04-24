import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
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
import {useDarkModeStore} from '../components/Settings';
import {themeStyle} from '../constants/Theme';
import ImagePicker from 'react-native-document-picker';
const AddBasketFormScreen = ({route}: any | null) => {
  const params = route?.params;
  const navigation = useNavigation();
  const {isDarkMode}: any | boolean = useDarkModeStore();
  const [naam, setNaam] = useState('');
  const [imageBackground, setImageBackground]: any = useState(
    params?.basketData.imageBackground
      ? params?.basketData.imageBackground
      : 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
  );

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

  const handleImageSubmit = () => {
    ImagePicker.pick().then(file => {
      setImageBackground(file[0].uri);
    });
  };

  return (
    <View
      accessible={true}
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }>
      <Formik
        accessibilityLabel="add new basket form"
        initialValues={{
          naam: params?.basketData.naam ? params?.basketData.naam : '',
          imageBackground: params?.basketData.imageBackground
            ? params?.basketData.imageBackground
            : 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
        }}
        onSubmit={async (values: any) => {
          if (!values.naam) {
            showToastWithGravity('Enter the name of your basket');
          } else {
            setNaam(values.naam);
            if (params?.basketData._id) {
              updateBasket().then(() => {
                showToastWithGravity(
                  'Het wijzigen van een winkelmandje is gelukt',
                );
                navigation.goBack();
              });
            } else {
              addNewBasket().then(() => {
                showToastWithGravity(
                  'Het toevoegen van een winkelmandje is gelukt',
                );
                navigation.goBack();
              });
            }
          }
        }}>
        {formikProps => (
          <View style={styles.container}>
            <TextInput
              accessibilityLabel="name input"
              style={styles.textInput}
              placeholder="Enter name"
              onChangeText={formikProps.handleChange('naam')}
              value={formikProps.values.naam}
            />
            <Text style={styles.previewText}>Preview image</Text>
            <Pressable style={styles.pressable} onPressIn={handleImageSubmit}>
              <ImageBackground
                source={{
                  uri: imageBackground
                    ? imageBackground
                    : params?.basketData.imageBackground,
                }}
                style={styles.image}
              />
            </Pressable>

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
  previewText: {
    fontSize: 20,
    marginTop: 20,
  },
  pressable: {
    width: '100%',
    marginTop: 30,
  },
  image: {
    height: 150,
    width: '100%',
  },
});

export default AddBasketFormScreen;
