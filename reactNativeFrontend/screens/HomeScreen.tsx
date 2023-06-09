import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDarkModeStore} from '../hooks/useDarkModeStore';
import {themeStyle} from '../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarcodeCard from '../components/BarcodeCard';
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
      <BarcodeCard />
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
});
export default HomeScreen;
