import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, Image } from 'react-native'
import icons from '../../icons';
import { CheckBox } from '../CheckBox';

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  },
  onSubmit: () => void
}

const ToDoItem = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [content, setContent] = useState('');

  const input = useRef(null);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3, marginHorizontal: 20 }}>
        {/* Checkbox */}
        
        <CheckBox isChecked={isChecked} />
       
        {/* Text Input */}
        <TextInput
          ref={input}
          value={content}
          onChangeText={setContent}
          style={{
            flex: 1,
            fontSize: 18,
            color: 'white',
            marginLeft: 12,
            backgroundColor: 'red'
          }}
          multiline
          blurOnSubmit
        />
      </View>
  )
}

export default ToDoItem