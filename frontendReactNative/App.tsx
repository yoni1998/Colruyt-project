import React from "react";
import { NativeBaseProvider } from "native-base";
import Navigation from "./navigation/navigation";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://10.16.26.45:4000/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <Navigation></Navigation>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}

export default App;
