import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import Navigation from './navigation/navigation';
import {ThemaContext} from './context/Thema';
import {useDarkModeStore} from './components/Settings';
const App = () => {
  const client = new ApolloClient({
    uri: 'http://172.24.80.1:4000/graphql/',
    cache: new InMemoryCache(),
  });

  const {isDarkMode, toggleDarkMode}: any | boolean = useDarkModeStore();

  return (
    <ApolloProvider client={client}>
      <ThemaContext.Provider value={{isDarkMode, toggleDarkMode}}>
        <Navigation />
      </ThemaContext.Provider>
    </ApolloProvider>
  );
};

export default App;
