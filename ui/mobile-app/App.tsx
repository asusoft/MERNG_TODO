//import liraries
import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';

// create a component
const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
