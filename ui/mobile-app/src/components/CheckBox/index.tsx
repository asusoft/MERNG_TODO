//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import icons from '../../icons';

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
}

export const CheckBox = (props: CheckBoxProps) => {
  const source = props.isChecked ? icons.checked : icons.unchecked;
  return (
    <Pressable onPress={() => props.onPress()}>
      <Image
        source={source}
        style={{height: 24, width: 24}}
        tintColor={'#FFF'}
      />
    </Pressable>
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
