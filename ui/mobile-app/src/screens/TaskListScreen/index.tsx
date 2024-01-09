//import liraries
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  View,
} from 'react-native';
import TaskListItem from '../../components/TaskListItem';
import { SimpleTask, useGetMyTaskListsQuery } from '../../shared/generated/types/graphql';

const TaskListScreen = () => {
  const { data, loading, error } = useGetMyTaskListsQuery()
  const [taskList, setTaskList] = useState<SimpleTask[]>();

  useEffect(() => {
    if (error) console.log("Error fetching task list " + error.message)
  }, [error])

  useEffect(() => {
    if (data) {
      const list = data.myTaskLists
      setTaskList(list)
    }
  }, [data])

  if (loading || data?.myTaskLists.length === 0)
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', ...styles.container}}>
        <ActivityIndicator size={'large'} />
      </View>
    )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={taskList}
        renderItem={({ item }) => <TaskListItem Item={item} />}
        style={{ width: '100%' }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 8,
        }}
      // ItemSeparatorComponent={() =>  <View style={{borderWidth: 0.3, borderColor: '#E3E5E5'}} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#2d2d30',
  },
});


export default TaskListScreen;
