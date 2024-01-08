//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ToDoItem from './src/components/ToDoItem';

// create a component
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ToDoItem />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 20
  },
});

//make this component available to the app
export default App;
