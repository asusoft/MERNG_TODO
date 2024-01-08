import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from '../AuthStack';
import NoAuthStack from '../NoAuthStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NoAuthStack">
      <Stack.Screen name="Root" component={AuthStack} />
      <Stack.Screen name="NoAuthStack" component={NoAuthStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
