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
  Image,
} from 'react-native';
import ToDoItem from '../../components/ToDoItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetTaskQuery, SimpleTodoFragment, useCreateTodoMutation, useUpdateTaskMutation } from '../../shared/generated/types/graphql';
import AddButton from '../../components/AddButton';
import icons from '../../icons';

// create a component
const TodosScreen = () => {
  const route = useRoute()
  const id = route.params?.id
  const [title, setTitle] = useState('Hello');
  const [todos, setTodos] = useState<SimpleTodoFragment[]>([]);
  const navigation = useNavigation()

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
  };

  const updateTaskTitle = async () => {
    await updateTask({ variables: { taskId: id, title } })
  }

  if (loading)
    return (
      <View style={{ justifyContent: 'center', ...styles.container }}>
        <ActivityIndicator size={'large'} />
      </View>
    )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#2d2d30' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 20 }} >
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={icons.back} style={{ height: 20, width: 30, tintColor: 'white' }} />
          </Pressable>
          <TextInput
            style={styles.title}
            value={title}
            placeholder={'Title'}
            onChangeText={setTitle}
            placeholderTextColor={'grey'}
            onEndEditing={updateTaskTitle}
          />
          <View />
        </View>
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <ToDoItem todo={item} onSubmit={() => createNewItem(index + 1)} />
          )}
          ListEmptyComponent={
              <View style={{ justifyContent: 'center', ...styles.container }}>
                <Text style={{ color: 'grey', fontSize: 24 }}>Add your first ToDo</Text>
                <AddButton onPress={() => createNewItem(0)} />
              </View>
          }
          contentContainerStyle={{ flex: 1 }}
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
    marginLeft: -20
  },
});

//make this component available to the TodosScreen
export default TodosScreen;
