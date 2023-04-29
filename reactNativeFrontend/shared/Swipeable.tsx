import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const renderRightActions = () => {
  return (
    <RectButton style={styles.rightAction}>
      <Icon name="trash" color="white" size={35} />
    </RectButton>
  );
};

export const renderLeftActions = () => {
  return (
    <RectButton style={styles.leftAction}>
      <Icon name="edit" color="white" size={35} />
    </RectButton>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    alignItems: 'center',
    flex: 1,
    height: 130,
    justifyContent: 'center',
    backgroundColor: '#3b3bf6',
  },

  rightAction: {
    alignItems: 'center',
    flex: 1,
    height: 130,
    justifyContent: 'center',
    backgroundColor: '#ee0303',
  },
});
