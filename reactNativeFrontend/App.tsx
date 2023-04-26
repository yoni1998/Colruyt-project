import React from 'react';
import Navigation from './navigation/navigation';
import {ThemaContext} from './context/Thema';
import {useDarkModeStore} from './components/Settings';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './constants/GraphqlAccess';

const App = () => {
  const {isDarkMode, toggleDarkMode}: any | boolean = useDarkModeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemaContext.Provider value={{isDarkMode, toggleDarkMode}}>
        <Navigation />
      </ThemaContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
