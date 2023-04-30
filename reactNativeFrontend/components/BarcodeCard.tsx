import {View, Text, ImageBackground, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {themeStyle} from '../constants/Theme';
import {useDarkModeStore} from '../hooks/useDarkModeStore';
import {showToastWithGravity} from '../shared/Toast';

const BarcodeCard = () => {
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
      }>
      <Pressable style={styles.barcodeCard} onPress={() => openBarcodeReader()}>
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
  );
};

const styles = StyleSheet.create({
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

export default BarcodeCard;
