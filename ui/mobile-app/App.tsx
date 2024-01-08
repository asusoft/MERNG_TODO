//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ToDoItem from './src/components/ToDoItem';

// create a component
const App = () => {
  const [todos, setTodos] = useState([{
    id: 'dsghdshjdfs',
    content: 'Buy milk',
    isCompleted: false
  }, {
    id: 'asldlskjfoif',
    content: 'Cook food',
    isCompleted: false
  }, {
    id: 'oasdoiriuds',
    content: 'Eat food',
    isCompleted: false
  }])

  const createNewItem = (index: number) => {
    const newTodos = [...todos]

    newTodos.splice(index, 0, {
      id: 'kakjadsiucg',
      content: '',
      isCompleted: false
    })

    setTodos(newTodos)
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => <ToDoItem todo={item} onSubmit={() => createNewItem(index + 1)} />}
        style={{ width: '100%' }}
      />
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
