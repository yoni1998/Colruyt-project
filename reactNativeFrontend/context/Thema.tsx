import {createContext} from 'react';

export const ThemaContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});
