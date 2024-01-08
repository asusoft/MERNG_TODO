import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodosScreen from '../../screens/TodosScreen';
import TaskListScreen from '../../screens/TaskListScreen';

export type AuthStackParamList = {
  Home: undefined;
  ToDoScreen: {id: string};
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={TaskListScreen} />
      <Stack.Screen name="ToDoScreen" component={TodosScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
