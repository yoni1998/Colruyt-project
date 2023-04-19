import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  return (
    <View
      style={styles.container}
      onTouchStart={() => navigation.navigate('Search')}>
      <TextInput
        editable={false}
        style={styles.input}
        placeholder="Zoeken naar producten..."
      />
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
