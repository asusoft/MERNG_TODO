//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import icons from '../../icons';

interface ButtonProps {
  onPress: () => void;
}
// create a component
const AddButton = ({onPress}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Image
        source={icons.plus}
        style={{
          height: 40,
          width: 40,
          tintColor: '#fff',
          resizeMode: 'contain',
        }}
      />
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  button: {
    right: 30,
    bottom: 40,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#e33062',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//make this component available to the app
export default AddButton;
