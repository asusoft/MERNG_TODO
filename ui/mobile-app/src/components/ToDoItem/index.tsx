import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  Text,
} from 'react-native';
import { CheckBox } from '../CheckBox';
import { SimpleTodoFragment, User } from '../../shared/generated/types/graphql';
import Avatar from '../Avatar';
import AddButton from '../AddButton';
import AssignUserToToDo from '../Modals/AddUserToTask';
import icons from '../../icons';
import SubtaskItem from '../SubtaskItem';
import { useToDo } from '../../entities/todo/use-todo';

interface ToDoItemProps {
  todo: SimpleTodoFragment;
  onSubmit: () => void;
  onDelete: () => void;
  onUpdate: (id: string, checked: boolean, content: string) => void;
  users: User[] | undefined;
}

const ToDoItem = ({
  todo,
  onSubmit,
  onDelete,
  onUpdate,
  users,
}: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState(todo.content);
  const [showAddUser, setAddUser] = useState(false);
  const [showAssignedUsers, setShowAssignedUsers] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const { actions, subtasks, assignedUsers} = useToDo(todo.id)

  const inputRef = useRef<TextInput>(null);

  const callUpdateToDo = async (checked: boolean) => {
    onUpdate(todo.id, checked, content);
  };

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

  const onKeyPress = async ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (nativeEvent.key === 'Backspace' && content === '') {
      onDelete();
    }
  };

  const onToggleChecked = () => {
    setIsChecked(s => !s);
    callUpdateToDo(!isChecked);
  };

  const callAssignUser = (userId: string) => {
    actions.assignUserToToDo(userId);
  };

  const callUnAssignUser = (userId: string) => {
    actions.unAssignUserFromToDo(userId);
  };

  const toggleListModal = () => {
    if (showAddUser || (!showAddUser && !showAssignedUsers)) {
      setAddUser(!showAddUser);
      setShowAssignedUsers(false);
    } else if (showAssignedUsers) {
      setShowAssignedUsers(false);
    }
  };

  function RenderListEmptyComponent() {
    return (
      <Pressable  onPress={() => actions.createSubTask(1)} style={{ marginLeft: 60, justifyContent: 'center'}}>
        <Text style={{color: 'grey', fontSize: 18}}>Add a subtask</Text>
      </Pressable>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 3,
          marginHorizontal: 20,
          paddingVertical: 8,
        }}>
        {todo.subtasks && (
          <Pressable onPress={() => setShowSubtasks(!showSubtasks)}>
            <Image
              source={icons.back}
              style={{
                marginTop: 2,
                marginRight: 5,
                height: 18,
                width: 18,
                tintColor: 'white',
                transform: [{ rotate: showSubtasks ? '270deg' : '180deg' }],
              }}
            />
          </Pressable>
        )}

        <CheckBox isChecked={isChecked} onPress={onToggleChecked} />
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
          <View
            style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: -2 }}>
            {assignedUsers?.slice(-5).map((user, index) => (
              <Pressable
                onPress={() => setShowAssignedUsers(true)}
                key={user.id}
                style={{ marginLeft: -10 }}>
                <Avatar user={user} dimension={25} index={index} />
              </Pressable>
            ))}
          </View>
          <View style={{ marginLeft: 10, marginTop: -2 }}>
            <AddButton
              onPress={() => toggleListModal()}
              dimension={25}
              icon={showAddUser || showAssignedUsers ? 'cross' : 'plus'}
            />
          </View>
          {showAddUser && (
            <View style={styles.addToDo}>
              <AssignUserToToDo users={users} onAdd={callAssignUser} />
            </View>
          )}
          {showAssignedUsers && (
            <View style={styles.addToDo}>
              <AssignUserToToDo
                users={assignedUsers}
                onRemove={callUnAssignUser}
              />
            </View>
          )}
        </View>
      </View>
      {showSubtasks && (
        <FlatList
          data={subtasks}
          renderItem={({ item, index }) => (
            <View style={{ marginLeft: 52 }}>
              <SubtaskItem  
                todo={item}
                onSubmit={() => actions.createSubTask(index + 1)}
                onDelete={() => actions.deleteSubtask(item.id)}
                onUpdate={actions.updateSubtask}
                />
            </View>
          )}
          contentContainerStyle={{ flex: 1 }}
          style={{ width: '100%' }}
          ListEmptyComponent={RenderListEmptyComponent()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addToDo: {
    position: 'absolute',
    backgroundColor: '#22303c',
    marginLeft: 'auto',
    right: 30,
    top: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default ToDoItem;
