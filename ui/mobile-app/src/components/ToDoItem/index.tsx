import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput} from 'react-native';
import {CheckBox} from '../CheckBox';

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  onSubmit: () => void;
}

const ToDoItem = ({todo, onSubmit}: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState(todo.content);

  const inputRef = useRef(null);

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

  const onKeyPress = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace' && content === '') {
      console.log('Delete');
    }
  };

  return (
    <View
      style={{flexDirection: 'row', marginVertical: 3, marginHorizontal: 20}}>
      <CheckBox isChecked={isChecked} onPress={() => setIsChecked(s => !s)} />
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
      />
    </View>
  );
};

export default ToDoItem;
