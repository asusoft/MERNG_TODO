//import liraries
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { CheckBox } from '../CheckBox';
import { SimpleSubtaskFragment } from '../../shared/generated/types/graphql';

interface SubtaskItemProps {
    todo: SimpleSubtaskFragment;
    onSubmit: () => void;
    onDelete: () => void;
    onUpdate: (id: string, checked: boolean, content: string) => void;
}

// create a component
const SubtaskItem = ({ 
    todo,
    onSubmit,
    onDelete,
    onUpdate,
}: SubtaskItemProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [content, setContent] = useState(todo.content);

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

    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, [inputRef]);

    return (
        <View
            style={{
                flexDirection: 'row',
                marginVertical: 3,
                marginHorizontal: 20,
                paddingVertical: 8,
            }}>
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
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SubtaskItem;
