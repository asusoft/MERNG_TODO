//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import icons from '../../icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {timeAgo} from '../../helpers/timeAgo';

interface TaskListItemProps {
  Item: {
    id: string;
    title: string;
    createdAt: string;
  };
  onDelete: () => void;
}

// create a component
const TaskListItem = ({Item, onDelete}: TaskListItemProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const onItemPress = () => {
    navigation.navigate('ToDoScreen', {id: Item.id});
  };

  const createdAt = timeAgo(Item.createdAt);
  return (
    <Pressable
      style={{flexDirection: 'row', gap: 5, marginVertical: 12}}
      onPress={onItemPress}>
      <Image
        source={icons.file}
        style={{height: 30, width: 30}}
        tintColor={'white'}
      />
      <View>
        <Text style={{fontSize: 22, color: 'white'}}>{Item.title}</Text>
        <Text style={{fontSize: 12, color: 'white', opacity: 0.7}}>
          {createdAt}
        </Text>
      </View>
      <Pressable onPress={onDelete} style={{marginLeft: 'auto'}}>
        <Image
          source={icons.trash}
          style={{height: 25, width: 25, tintColor: '#e33062'}}
        />
      </Pressable>
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
