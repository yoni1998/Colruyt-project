import {View, Text, Switch, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themeStyle} from '../constants/Theme';

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {isDarkMode, toggleDarkMode}: any | boolean = useDarkModeStore();

  const toggleSwitch = () => {
    setIsEnabled((previousState: any) => !previousState);
    toggleDarkMode();
  };

  useEffect(() => {
    if (isDarkMode) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [isDarkMode]);

  return (
    <View
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }>
      <View style={styles.container}>
        <Text
          style={
            isDarkMode ? themeStyle.blackThemeText : themeStyle.lightThemeText
          }>
          Change Theme
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export const useDarkModeStore = create(
  persist(
    (set: any) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state: any) => ({isDarkMode: !state.isDarkMode})),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    marginTop: 40,
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
  text: {
    color: 'white',
    fontSize: 22,
  },
});

export default Settings;
