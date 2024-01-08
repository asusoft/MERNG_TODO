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

const ToDoItem = (props: ToDoItemProps) => {
    const { todo } = props
    const [isChecked, setIsChecked] = useState(false);
    const [content, setContent] = useState(todo.content);

    //const input = useRef(null);

    useEffect(() => {
        if(!todo) { return }
        setIsChecked(todo.isCompleted)
        setContent(todo.content)
    }, [todo])

    return (
        <View style={{ flexDirection: 'row', marginVertical: 3, marginHorizontal: 20 }}>
            <CheckBox isChecked={isChecked} onPress={() => setIsChecked(s => !s)} />
            <TextInput
                //ref={input}
                value={content}
                onChangeText={setContent}
                style={{
                    flex: 1,
                    marginTop: -2,
                    fontSize: 18,
                    color: 'white',
                    marginLeft: 12,
                }}
                multiline
               
            />
        </View>
    )
}

export default ToDoItem