//import liraries
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  View,
  Pressable,
  Text,
} from 'react-native';
import ToDoItem from '../../components/ToDoItem';
import { useRoute } from '@react-navigation/native';
import { useGetTaskQuery, SimpleTodoFragment, useCreateTodoMutation, useUpdateTaskMutation } from '../../shared/generated/types/graphql';
import AddButton from '../../components/AddButton';
import CreateModal from '../../components/Modals';

// create a component
const TodosScreen = () => {
  const route = useRoute()
  const id = route.params?.id
  const [title, setTitle] = useState('Hello');
  const [todos, setTodos] = useState<SimpleTodoFragment[]>([]);
  const [total, setTotal] = useState<number>()

  const { data, loading, error } = useGetTaskQuery({ variables: { taskId: id } })

  const [createToDo] = useCreateTodoMutation()
  const [updateTask] = useUpdateTaskMutation()

  useEffect(() => {
    if (error) console.log("Error fetching task list " + error.message)
  }, [error])

  useEffect(() => {
    if (data) {
      const title = data.getTaskList.title
      setTitle(title)
      setTodos(data.getTaskList.todos)
      setTotal(data.getTaskList?.todos?.length)
    }
  }, [data])

  const createNewItem = async (index: number) => {
    const response = await createToDo({ variables: { content: '', taskListId: id } })
    const newTodos = [...todos];

    newTodos.splice(index, 0, {
      id: response.data?.createToDo.id,
      content: '',
      isCompleted: false,
    });

    setTodos(newTodos);
    setTotal(t => t + 1)
  };

  const updateTaskTitle = async () => {
    await updateTask({ variables: { taskId: id, title } })
  }

  if (loading || !data)
    return (
      <View style={{ justifyContent: 'center', ...styles.container }}>
        <ActivityIndicator size={'large'} />
      </View>
    )

  if (total < 1)
    return (
      <View style={{ justifyContent: 'center', ...styles.container }}>
        <Text style={{ color: 'grey', fontSize: 24 }}>Add your first ToDo</Text>
        <AddButton onPress={() => createNewItem(0)} />
      </View>
    )
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#2d2d30' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.title}
          value={title}
          placeholder={'Title'}
          onChangeText={setTitle}
          placeholderTextColor={'grey'}
          onEndEditing={updateTaskTitle}
        />
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <ToDoItem todo={item} onSubmit={() => createNewItem(index + 1)} />
          )}
          style={{ width: '100%' }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d30',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

//make this component available to the TodosScreen
export default TodosScreen;
