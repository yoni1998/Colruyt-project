import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>lOADING...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '50%',
  },
  text: {
    fontSize: 24,
  },
});

export default Loading;
