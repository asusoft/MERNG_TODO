import React from 'react';
import {StyleSheet, Pressable, Image} from 'react-native';
import icons from '../../icons';

interface ButtonProps {
  onPress: () => void;
  dimension: number;
  icon?: 'cross' | 'plus';
}

const AddButton = ({onPress, dimension, icon = 'plus'}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: dimension,
        width: dimension,
        borderRadius: dimension / 2,
        ...styles.button,
      }}>
      <Image
        source={icons[icon]}
        style={{
          height: dimension / 2 + 5,
          width: dimension / 2 + 5,
          tintColor: '#fff',
          resizeMode: 'contain',
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e33062',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddButton;
