import React, {useEffect, useState} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import AddButton from '../../components/AddButton';
import icons from '../../icons';
import {useToDoList} from './model/use-todo-list';
import {RouteProp} from '@react-navigation/native';

interface RouteParams {
  id: string;
}

type MyRouteStackParamList = {
  Route: RouteParams;
};

const TodosScreen = () => {
  const route = useRoute<RouteProp<MyRouteStackParamList, 'Route'>>();
  const id = route.params?.id;

  const navigation = useNavigation();

  const {list, actions, loading, title} = useToDoList(id);
  const [newTitle, setTitle] = useState(title);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  if (loading) {
    return (
      <View style={{justifyContent: 'center', ...styles.container}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#2d2d30'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: 20,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              style={{height: 20, width: 30, tintColor: 'white'}}
            />
          </Pressable>
          <TextInput
            style={styles.title}
            value={newTitle}
            placeholder={'Title'}
            onChangeText={setTitle}
            placeholderTextColor={'grey'}
            onEndEditing={() => actions.updateTask(newTitle)}
          />
          <View />
        </View>
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ToDoItem
              todo={item}
              onSubmit={() => actions.createNew(index + 1)}
              onDelete={() => actions.deleteTodo(item.id)}
              onUpdate={actions.updateToDo}
            />
          )}
          ListEmptyComponent={
            <View style={{justifyContent: 'center', ...styles.container}}>
              <Text style={{color: 'grey', fontSize: 24}}>
                Add your first ToDo
              </Text>
              <AddButton onPress={() => actions.createNew(0)} />
            </View>
          }
          contentContainerStyle={{flex: 1}}
          style={{width: '100%'}}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

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
    marginLeft: -20,
  },
});

export default TodosScreen;
