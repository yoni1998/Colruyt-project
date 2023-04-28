import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {showToastWithGravity} from '../shared/Toast';
import {useDarkModeStore} from '../hooks/useDarkModeStore';
import {themeStyle} from '../constants/Theme';
import ImagePicker from 'react-native-document-picker';
import useCreateNewBasket from '../hooks/useCreateNewBasket';
import {queryClient} from '../constants/GraphqlAccess';
import useUpdateBasket from '../hooks/useUpdateBasket';
const AddBasketFormScreen = ({route}: any | null) => {
  const params = route?.params;
  const navigation = useNavigation() as any;
  const {isDarkMode}: any | boolean = useDarkModeStore();
  const [imageBackground, setImageBackground]: any = useState(
    params?.basketData.imageBackground
      ? params?.basketData.imageBackground
      : 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
  );

  const addBasket = useCreateNewBasket();

  const updateBasket = useUpdateBasket({basketId: params?.basketData?._id});

  if (addBasket.isSuccess || updateBasket.isSuccess) {
    queryClient.refetchQueries('baskets');
  }

  const handleImageSubmit = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage permission',
        message: 'Storage permission ' + 'so you can select awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.pick().then(file => {
        setImageBackground(file[0].uri);
      });
    } else {
      showToastWithGravity('Camera permission denied');
    }
  };

  const addOrUpdateBasket = (name: string) => {
    if (!name) {
      showToastWithGravity('Enter the name of your basket');
    } else {
      if (params?.basketData._id) {
        updateBasket.mutate({name, imageBackground});

        showToastWithGravity('Het wijzigen van een winkelmandje is gelukt');
        navigation.navigate('Baskets');
      } else {
        addBasket.mutate({name, imageBackground});
        showToastWithGravity('Het toevoegen van een winkelmandje is gelukt');
        navigation.navigate('Baskets');
      }
    }
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
          name: params?.basketData.name ? params?.basketData.name : '',
          imageBackground: params?.basketData.imageBackground
            ? params?.basketData.imageBackground
            : 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
        }}
        onSubmit={async (values: any) => {
          addOrUpdateBasket(values.name);
        }}>
        {formikProps => (
          <View style={styles.container}>
            <TextInput
              accessibilityLabel="name input"
              style={styles.textInput}
              placeholder="Enter name"
              onChangeText={formikProps.handleChange('name')}
              value={formikProps.values.name}
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

            <Pressable
              onPress={() => formikProps.handleSubmit()}
              style={styles.button}>
              {params?.basketData.name && (
                <Text style={styles.text}>Basket Wijzigen</Text>
              )}
              {!params?.basketData.name && (
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
