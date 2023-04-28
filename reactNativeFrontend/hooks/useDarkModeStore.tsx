import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

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
