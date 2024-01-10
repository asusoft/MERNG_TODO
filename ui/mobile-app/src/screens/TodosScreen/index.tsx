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
import AddButton from '../../components/AddButton';
import icons from '../../icons';
import { useToDoList } from './model/use-todo-list';
import { RouteProp } from '@react-navigation/native';
import Avatar from '../../components/Avatar';
import { ProgressBar } from 'react-native-paper';

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

  const { list, actions, loading, title, users, addedUsers, progress } = useToDoList(id);
  const [newTitle, setTitle] = useState(title);
  const [showAddUser, setShowAddUser] = useState(false)

  useEffect(() => {
    setTitle(title);
  }, [title]);

  const addUser = (id: string) => {
    actions.addUserToTask(id)
    //setShowAddUser(s => !s)
  }

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', ...styles.container }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#2d2d30' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '90%',
            marginBottom: 20,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              style={{ height: 20, width: 30, tintColor: 'white' }}
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
          <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
            {
              addedUsers?.slice(-5).map((user, index) => (
                <Pressable onPress={() => console.warn('Pressed')} key={user.id} style={{ marginLeft: -12 }}>
                  <Avatar user={user} dimension={30} index={index}/>
                </Pressable>
              ))
            }
          </View>
          <View style={{ marginLeft: 10}}>
            <AddButton onPress={() => setShowAddUser(s => !s)} dimension={30} icon={showAddUser ? 'cross' : 'plus'}/>
          </View>
          
        </View>
        {
          list.length > 0 && <ProgressBar progress={progress} theme={{ colors: { primary: '#e33062' } }} style={{ height: 2, width: 350, marginBottom: 20}}/>
        }
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <ToDoItem
              todo={item}
              onSubmit={() => actions.createNew(index + 1)}
              onDelete={() => actions.deleteTodo(item.id)}
              onUpdate={actions.updateToDo}
            />
          )}
          ListEmptyComponent={
            <View style={{ justifyContent: 'center', ...styles.container }}>
              <Text style={{ color: 'grey', fontSize: 24 }}>
                Add your first ToDo
              </Text>
              <View style={{
                position: 'absolute',
                right: 30,
                bottom: 40,
              }}>
                <AddButton onPress={() => actions.createNew(0)} dimension={60} />
              </View>
            </View>
          }
          contentContainerStyle={{ flex: 1 }}
          style={{ width: '100%' }}
        />
        {showAddUser && (
          <View style={{ position: 'absolute', backgroundColor: '#22303c', marginLeft: "auto", right: 58, top: 58, borderRadius: 8, borderWidth: 1, borderColor: 'grey' }}>
            <FlatList
              data={users}
              renderItem={({ item, index }) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                  <Avatar user={item} dimension={25} index={index}/>
                  <Text style={{ fontSize: 18, color: 'white', marginLeft: 10, marginRight: 8 }}>{item.name.split(' ')[0]}</Text>
                  <Pressable onPress={() => addUser(item.id)} style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, height: 25, backgroundColor: '#e33062', marginLeft: "auto", borderRadius: 8, alignSelf: 'flex-end' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>Add</Text>
                  </Pressable>
                </View>
              )}
              contentContainerStyle={{
                padding: 20,
                gap: 5
              }}
              ListEmptyComponent={
                <View>
                  <Text style={{ fontSize: 14, color: 'white'}}>All users have been added</Text>
                </View>
              }
            />
          </View>
        )}
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
    marginLeft: 20,
  },
});

export default TodosScreen;
