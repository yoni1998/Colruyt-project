import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import Navigation from './navigation/navigation';
const App = () => {
  const client = new ApolloClient({
    uri: 'http://192.168.1.61:4000/graphql/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
};

export default App;
