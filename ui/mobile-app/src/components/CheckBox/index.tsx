import React from 'react';
import {Image, Pressable} from 'react-native';
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
        tintColor={props.isChecked ? 'grey' : '#FFF'}
      />
    </Pressable>
  );
};
