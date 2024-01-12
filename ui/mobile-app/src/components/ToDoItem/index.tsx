import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, Pressable, StyleSheet } from 'react-native';
import { CheckBox } from '../CheckBox';
import { SimpleTodoFragment, User } from '../../shared/generated/types/graphql';
import Avatar from '../Avatar';
import AddButton from '../AddButton';
import AddUserToTask from '../Modals/AddUserToTask';

interface ToDoItemProps {
  todo: SimpleTodoFragment;
  onSubmit: () => void;
  onDelete: () => void
  onUpdate: (id: string, checked: boolean, content: string) => void
  onAssignUser: (id: string, userId: string) => void
  users: User[] | undefined
}

const ToDoItem = ({ todo, onSubmit, onDelete, onUpdate, onAssignUser, users }: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState(todo.content);
  const [showAddUser, setAddUser] = useState(false)

  const inputRef = useRef<TextInput>(null);

  const callUpdateToDo = async (checked: boolean) => {
      onUpdate(todo.id, checked, content)
  }

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onKeyPress = async ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (nativeEvent.key === 'Backspace' && content === '') {
      onDelete();
    }
  };

  const onToggleChecked = () => {
    setIsChecked(s => !s)
    callUpdateToDo(!isChecked)
  }

  const callAssignUser = (userId: string) => {
     console.log(userId)
     onAssignUser(todo.id, userId)
  }

  return (
    <View
      style={{ flexDirection: 'row', marginVertical: 3, marginHorizontal: 20, paddingVertical: 8 }}>
      <CheckBox 
        isChecked={isChecked}
        onPress={onToggleChecked}
      />
      <TextInput
        ref={inputRef}
        value={content}
        onChangeText={setContent}
        style={{
          flex: 1,
          marginTop: -2,
          fontSize: 18,
          color: isChecked ? 'grey' : 'white',
          marginLeft: 12,
        }}
        onSubmitEditing={onSubmit}
        blurOnSubmit
        onKeyPress={onKeyPress}
        onEndEditing={() => callUpdateToDo(isChecked)}
      />
      <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: -2 }}>
          {
            todo.assignees?.slice(-5).map((user, index) => (
              <Pressable onPress={() => {}} key={user.id} style={{ marginLeft: -15 }}>
                <Avatar user={user} dimension={25} index={index} />
              </Pressable>
            ))
          }
        </View>
        <View style={{ marginLeft: 10, marginTop: -2 }}>
          <AddButton onPress={() => setAddUser(!showAddUser)} dimension={25} icon={showAddUser ? 'cross' : 'plus'} />
        </View>
        {showAddUser && (
          <View style={styles.addToDo}>
            <AddUserToTask users={users} onAdd={callAssignUser} />
          </View>
        )}
      </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  addToDo: {
    position: 'absolute',
    backgroundColor: '#22303c',
    marginLeft: "auto",
    right: 30,
    top: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default ToDoItem;
