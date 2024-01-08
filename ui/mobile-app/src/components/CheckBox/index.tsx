//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import icons from '../../icons';


interface CheckBoxProps {
    isChecked: boolean
}
// create a component
export const CheckBox = (props: CheckBoxProps) => {

    const source = props.isChecked ? icons.checked : icons.unchecked
    return (
        <Image source={source} style={{ height: 30, width: 30}} tintColor={'#FFF'}/>
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
