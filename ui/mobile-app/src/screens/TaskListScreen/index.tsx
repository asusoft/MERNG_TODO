import React, {useState} from 'react';
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
import CreateModal from '../../components/Modals';
import {useTaskList} from './model/use-task-list';

export const TaskListScreen = () => {
  const [isAddTask, setIsAddTask] = useState(false);
  const [title, setTitle] = useState('');
  const {list, createNewTask, loading} = useTaskList();

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
      <FlatList
        data={list}
        renderItem={({item}) => <TaskListItem Item={item} />}
        style={{width: '100%'}}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 2,
          flex: 1,
        }}
        ListEmptyComponent={
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <Text style={{color: 'grey', fontSize: 24}}>
              Add your first Task
            </Text>
          </View>
        }
      />
      <AddButton onPress={() => setIsAddTask(true)} />
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
    backgroundColor: '#2d2d30',
  },
});

export default TaskListScreen;
