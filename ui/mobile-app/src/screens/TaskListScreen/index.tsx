import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import TaskListItem from '../../components/TaskListItem';
import AddButton from '../../components/AddButton';
import CreateModal from '../../components/Modals/create-todo';
import { useTaskList } from './model/use-task-list';

export const TaskListScreen = () => {
  const [isAddTask, setIsAddTask] = useState(false);
  const [title, setTitle] = useState('');
  const { list, createNewTask, loading, deleteTask } = useTaskList();

  const onCreate = async () => {
    if (title !== '') {
      await createNewTask(title);
      setTitle('');
      setIsAddTask(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          ...styles.container,
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ margin: 20, fontSize: 30, fontWeight: 'bold', color: 'white' }}>My Tasks</Text>
      <FlatList
        data={list}
        renderItem={({ item }) => <TaskListItem Item={item} onDelete={() => deleteTask(item.id)}/>}
        style={{ width: '100%' }}
        contentContainerStyle={{
          padding: 20,
          gap: 5,
          backgroundColor: '#192734',
          margin: 20,
          borderRadius: 12
        }}
        ListEmptyComponent={
          <View
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontSize: 24 }}>
              Add your first Task
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 0.4, backgroundColor: 'grey' }} />}
      />
      <View style={{
        position: 'absolute',
        right: 30,
        bottom: 40,
      }}>
        <AddButton onPress={() => setIsAddTask(true)} dimension={60} />
      </View>
      <CreateModal
        value={title}
        onSubmit={() => onCreate()}
        onChange={value => {
          setTitle(value);
        }}
        label="New Task"
        isAdd={isAddTask}
        toggleIsAdd={() => setIsAddTask(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#15202b',
  },
});

export default TaskListScreen;
