//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';

interface CreatModalProps {
  isAdd: boolean;
  value: string;
  onChange: (text: string) => void;
  toggleIsAdd: () => void;
  label: string;
  onSubmit: () => void;
}
// create a component
const CreateModal = ({
  isAdd,
  value,
  onChange,
  toggleIsAdd,
  label,
  onSubmit,
}: CreatModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isAdd}>
      <Pressable onPress={() => toggleIsAdd()} style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{color: 'white', fontWeight: '700', fontSize: 20}}>
            Add New Task
          </Text>
          <TextInput
            value={value}
            onChangeText={text => onChange(text)}
            placeholder={label}
            placeholderTextColor={'grey'}
            style={{
              height: 40,
              color: 'white',
              fontSize: 16,
              width: '100%',
              borderWidth: 1,
              borderColor: 'grey',
              paddingVertical: 8,
              paddingHorizontal: 6,
              borderRadius: 8,
            }}
          />
          <Pressable style={styles.button} onPress={onSubmit}>
            <Text style={styles.textStyle}>Add Task</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    gap: 14,
    width: '80%',
    marginHorizontal: 20,
    backgroundColor: '#22303c',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#e33062',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//make this component available to the app
export default CreateModal;
