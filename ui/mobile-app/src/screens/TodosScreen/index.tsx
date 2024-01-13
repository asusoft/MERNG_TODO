import React, {useEffect, useRef, useState} from 'react';
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
import {useRoute} from '@react-navigation/native';
import AddButton from '../../components/AddButton';
import icons from '../../icons';
import {useToDoList} from './model/use-todo-list';
import {RouteProp} from '@react-navigation/native';
import Avatar from '../../components/Avatar';
import {ProgressBar} from 'react-native-paper';
import AddUserToTask from '../../components/Modals/AddUserToTask';
import AddedUsers from '../../components/Modals/AddUserToTask';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';

type ToDoScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ToDoScreen'
>;

interface RouteParams {
  id: string;
}

type MyRouteStackParamList = {
  Route: RouteParams;
};

type Props = {
  navigation: ToDoScreenNavigationProp;
};

const TodosScreen = ({navigation}: Props) => {
  const route = useRoute<RouteProp<MyRouteStackParamList, 'Route'>>();
  const id = route.params?.id;
  const {list, actions, loading, title, users, addedUsers, progress} =
    useToDoList(id);
  const [newTitle, setTitle] = useState(title);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [editTitle, setEditTitle] = useState(false);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  const callEditTitle = async () => {
    if (editTitle) {
      await actions.updateTask(newTitle);
      setEditTitle(false);
      if (inputRef.current) {
        inputRef.current?.blur();
      }
    } else {
      setEditTitle(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const toggleListModal = () => {
    if (showAddUser || (!showAddUser && !showUsers)) {
      setShowAddUser(!showAddUser);
      setShowUsers(false);
    } else if (showUsers) {
      setShowUsers(false);
    }
  };

  function RenderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          marginTop: 20,
          marginBottom: 10,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{height: 20, width: 30, tintColor: 'white'}}
          />
        </Pressable>
        <View>
          <TextInput
            ref={inputRef}
            style={styles.title}
            value={newTitle}
            placeholder={'Title'}
            onChangeText={setTitle}
            placeholderTextColor={'grey'}
            maxLength={15}
          />
        </View>
        <Pressable
          onPress={callEditTitle}
          style={{marginLeft: 5, justifyContent: 'center', marginTop: -8}}>
          <Image
            source={editTitle ? icons.done : icons.edit}
            style={{
              height: 25,
              width: 30,
              tintColor: 'white',
              resizeMode: 'contain',
            }}
          />
        </Pressable>
        <View style={{flexDirection: 'row', marginLeft: 'auto', marginTop: -2}}>
          {addedUsers?.slice(-5).map((user, index) => (
            <Pressable
              onPress={() => setShowUsers(true)}
              key={user.id}
              style={{marginLeft: -20}}>
              <Avatar user={user} dimension={30} index={index} />
            </Pressable>
          ))}
        </View>
        <View style={{marginLeft: 10, marginTop: -2}}>
          <AddButton
            onPress={toggleListModal}
            dimension={30}
            icon={showAddUser || showUsers ? 'cross' : 'plus'}
          />
        </View>
      </View>
    );
  }

  function RenderListEmptyComponent() {
    return (
      <View style={{justifyContent: 'center', ...styles.container}}>
        <Text style={{color: 'grey', fontSize: 24}}>Add your first ToDo</Text>
        <View
          style={{
            position: 'absolute',
            right: 30,
            bottom: 40,
          }}>
          <AddButton onPress={() => actions.createNew(0)} dimension={60} />
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{justifyContent: 'center', ...styles.container}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#15202b'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
      <SafeAreaView style={styles.container}>
        {RenderHeader()}
        {list.length > 0 && (
          <ProgressBar
            progress={progress}
            theme={{colors: {primary: '#e33062'}}}
            style={{
              height: 2,
              width: 350,
              marginBottom: 20,
            }}
          />
        )}
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ToDoItem
              todo={item}
              onSubmit={() => actions.createNew(index + 1)}
              onDelete={() => actions.deleteTodo(item.id)}
              onUpdate={actions.updateToDo}
              onAssignUser={actions.assignUserToToDO}
              onUnAssignUser={actions.unAssignUserToToDO}
              users={addedUsers}
            />
          )}
          ListEmptyComponent={RenderListEmptyComponent()}
          contentContainerStyle={{flex: 1}}
          style={{width: '100%'}}
        />
        {showAddUser && (
          <View style={styles.addToDo}>
            <AddUserToTask users={users} onAdd={actions.addUserToTask} />
          </View>
        )}
        {showUsers && (
          <View style={styles.addToDo}>
            <AddedUsers
              users={addedUsers}
              onRemove={actions.removeUserFromTask}
            />
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  addToDo: {
    position: 'absolute',
    backgroundColor: '#22303c',
    marginLeft: 'auto',
    right: 60,
    top: 78,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#15202b',
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
