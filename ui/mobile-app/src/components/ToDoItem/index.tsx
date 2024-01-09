import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { CheckBox } from '../CheckBox';
import { useUpdateToDoMutation, useDeleteToDoMutation } from '../../shared/generated/types/graphql';

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  onSubmit: () => void;
}

const ToDoItem = ({ todo, onSubmit }: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState(todo.content);

  const [updateToDo] = useUpdateToDoMutation()
  const [deletToDo] = useDeleteToDoMutation()

  const inputRef = useRef(null);

  const callUpdateToDo = async (checked: boolean) => {
    await updateToDo({
      variables: {
        todoId: todo.id,
        content,
        isCompleted: checked
      }
    })
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

  const onKeyPress = async ({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace' && content === '') {
      await deletToDo({variables: {todoId: todo.id}});
    }
  };

  const onToggleChecked = () => {
    setIsChecked(s => !s)
    callUpdateToDo(!isChecked)
  }

  return (
    <View
      style={{ flexDirection: 'row', marginVertical: 3, marginHorizontal: 20 }}>
      <CheckBox isChecked={isChecked}
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
          color: 'white',
          marginLeft: 12,
        }}
        onSubmitEditing={onSubmit}
        blurOnSubmit
        onKeyPress={onKeyPress}
        onEndEditing={() => callUpdateToDo(isChecked)}
      />
    </View>
  );
};

export default ToDoItem;
