//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import icons from '../../icons';
import {useNavigation} from '@react-navigation/native';

interface TaskListItemProps {
  Item: {
    id: string;
    title: string;
    createdAt: string;
  };
}

// create a component
const TaskListItem = ({Item}: TaskListItemProps) => {
  const navigation = useNavigation();

  const onItemPress = () => {
    navigation.navigate('ToDoScreen', {id: Item.id});
  };

  return (
    <Pressable style={{flexDirection: 'row', gap: 5, marginBottom: 8}} onPress={onItemPress}>
      <Image
        source={icons.file}
        style={{height: 40, width: 40}}
        tintColor={'white'}
      />
      <View>
        <Text style={{fontSize: 22, color: 'white'}}>{Item.title}</Text>
        <Text style={{fontSize: 14, color: 'white', opacity: 0.7}}>
          {Item.createdAt}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d30',
  },
});

//make this component available to the app
export default TaskListItem;
