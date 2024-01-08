//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import icons from '../../icons';
import TaskListItem from '../../components/TaskListItem';

// create a component
const TaskListScreen = () => {
  const [taskList, setTaskList] = useState([
    {
      id: 'dsghdshjdfs',
      title: 'Task 1',
      createdAt: 'Today',
    },
    {
      id: 'asldlskjfoif',
      title: 'Task 2',
      createdAt: 'Yesterday',
    },
    {
      id: 'oasdoiriuds',
      title: 'Task 3',
      createdAt: 'Sunday',
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={taskList}
        renderItem={({item}) => <TaskListItem Item={item} />}
        style={{width: '100%'}}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 8,
        }}
        // ItemSeparatorComponent={() =>  <View style={{borderWidth: 0.3, borderColor: '#E3E5E5'}} />}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#2d2d30',
  },
});

//make this component available to the app
export default TaskListScreen;
