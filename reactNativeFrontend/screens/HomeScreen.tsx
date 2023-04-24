import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDarkModeStore} from '../components/Settings';
import {themeStyle} from '../constants/Theme';
const HomeScreen = () => {
  const navigation: any = useNavigation();
  const {isDarkMode}: any | boolean = useDarkModeStore();
  return (
    <View
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }
      accessible={true}
      onTouchStart={() => navigation.navigate('Search')}>
      <View
        style={styles.container}
        accessibilityLabel="Tap to navigate to search products">
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Search for products..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    width: 350,
    fontSize: 23,
    height: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 30,
  },
});
export default HomeScreen;
