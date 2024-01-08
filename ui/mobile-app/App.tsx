//import liraries
import React, {Component, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';

// create a component
const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
