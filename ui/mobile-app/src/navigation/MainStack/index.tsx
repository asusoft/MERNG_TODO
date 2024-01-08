import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen';
import AuthStack from '../AuthStack';
import NoAuthStack from '../NoAuthStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Root" component={AuthStack} />
      <Stack.Screen name="NoAuthStack" component={NoAuthStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
