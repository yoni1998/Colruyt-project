import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDarkModeStore} from '../hooks/useDarkModeStore';
import {themeStyle} from '../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToastWithGravity} from '../shared/Toast';
const HomeScreen = () => {
  const navigation: any = useNavigation();
  const {isDarkMode}: any | boolean = useDarkModeStore();

  const openBarcodeReader = () => {
    showToastWithGravity('Comming soon...');
  };
  return (
    <View
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }
      accessible={true}>
      <View
        style={styles.container}
        onTouchStart={() => navigation.navigate('Search')}
        accessibilityLabel="Tap to navigate to search products">
        <Icon
          style={styles.icon}
          name="search"
          color={isDarkMode ? '#FFFFFF' : '#171717'}
          size={30}
        />
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Search for products..."
        />
      </View>
      <View
        style={
          isDarkMode
            ? themeStyle.blackThemeBackground
            : themeStyle.lightThemeBackground
        }>
        <Pressable
          style={styles.barcodeCard}
          onPress={() => openBarcodeReader()}>
          <ImageBackground
            source={{
              uri: 'https://cdn.pixabay.com/photo/2021/04/01/11/40/barcode-6141974_960_720.png',
            }}
            style={styles.catoImage}>
            <View style={styles.gridContainer}>
              <Text style={styles.textStyle} numberOfLines={1}>
                Comming soon
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    paddingTop: 20,
    margin: 10,
  },
  input: {
    width: 350,
    fontSize: 23,
    height: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FAFCFF',
    marginTop: 30,
  },
  catoImage: {
    width: 300,
    justifyContent: 'flex-end',
    height: 200,
  },
  gridContainer: {},
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  barcodeCard: {
    marginTop: 80,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 30,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#1c1c1c',
    backgroundColor: '#ffffffc9',
  },
});
export default HomeScreen;
