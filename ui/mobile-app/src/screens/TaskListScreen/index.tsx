//import liraries
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ActivityIndicator, View,
  Pressable,
  Image,
  StyleSheet,
  Modal,
  Text,
  TextInput
} from 'react-native';
import TaskListItem from '../../components/TaskListItem';
import { SimpleTask, useGetMyTaskListsQuery, useCreateTaskMutation } from '../../shared/generated/types/graphql';
import icons from '../../icons';
import AddButton from '../../components/AddButton';
import CreateModal from '../../components/Modals';

export const TaskListScreen = () => {
  const { data, loading, error } = useGetMyTaskListsQuery();
  const [taskList, setTaskList] = useState<SimpleTask[]>();
  const [createTask] = useCreateTaskMutation()
  const [isAddTask, setIsAddTask] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (error) console.log("Error fetching task list " + error.message);
  }, [error]);

  useEffect(() => {
    if (data) {
      const list = data.myTaskLists;
      setTaskList(list);
    }
  }, [data]);

  const onCreate = async () => {
    if (title !== '') {
      await createTask({ variables: { title } })
      setTitle('')
      setIsAddTask(false)
    }
  }

  if (loading || data?.myTaskLists.length === 0)
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', ...styles.container }}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={taskList}
        renderItem={({ item }) => <TaskListItem Item={item} />}
        style={{ width: '100%' }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 2,
        }} />
      <AddButton onPress={() => setIsAddTask(true)} />
      <CreateModal
        value={title}
        onSubmit={() => onCreate()}
        onChange={value => {
          setTitle(value);
        }}
        label='New Task'
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
    backgroundColor: '#2d2d30',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    gap: 14,
    width: '80%',
    marginHorizontal: 20,
    backgroundColor: '#22303c',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#e33062"
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default TaskListScreen;
