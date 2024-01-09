//import liraries
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ToDoItem from '../../components/ToDoItem';
import { useRoute } from '@react-navigation/native';
import { useGetTaskQuery, SimpleTodoFragment } from '../../shared/generated/types/graphql';

// create a component
const TodosScreen = () => {
  const route = useRoute()
  const [title, setTitle] = useState('Hello');
  const [todos, setTodos] = useState<SimpleTodoFragment[]>([]);

  const {data, loading, error} = useGetTaskQuery({variables:{taskId: route.params?.id}})

  useEffect(() => {
    if(error) console.log("Error fetching task list " + error.message)
  }, [error])

  useEffect(() => {
    if(data){
      const title = data.getTaskList.title
      setTitle(title)
      setTodos(data.getTaskList.todos)
    }
  }, [data])

  const createNewItem = (index: number) => {
    const newTodos = [...todos];

    newTodos.splice(index, 0, {
      id: 'kakjadsiucg',
      content: '',
      isCompleted: false,
    });

    setTodos(newTodos);
  };

  if(loading || !data) return <ActivityIndicator />
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#2d2d30'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.title}
          value={title}
          placeholder={'Title'}
          onChangeText={setTitle}
          placeholderTextColor={'grey'}
        />
        <FlatList
          data={todos}
          renderItem={({item, index}) => (
            <ToDoItem todo={item} onSubmit={() => createNewItem(index + 1)} />
          )}
          style={{width: '100%'}}
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
