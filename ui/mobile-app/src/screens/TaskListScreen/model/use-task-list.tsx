import {useEffect, useState} from 'react';
import {
  SimpleTask,
  useGetMyTaskListsQuery,
  useCreateTaskMutation,
  useGetMyTaskListsLazyQuery,
} from '../../../shared/generated/types/graphql';
import {useIsFocused} from '@react-navigation/native';

export const useTaskList = () => {
  const isFocused = useIsFocused();
  const [list, setList] = useState<SimpleTask[]>([]);
  const {data, loading, error, refetch} = useGetMyTaskListsQuery();
  const [createTask] = useCreateTaskMutation();

  const actions = {
    getList: async () => {
      if (data) {
        const list = data.myTaskLists;
        setList(list);
      }
    },
    createNew: async (title: string) => {
      const responce = await createTask({variables: {title}});
      const newTask = responce.data?.createTaskList;
      if (newTask) {
        setList(state => {
          if (state && Array.isArray(state)) {
            return [
              ...state,
              {...newTask, __typename: 'SimpleTask'} as SimpleTask,
            ];
          }
          return state;
        });
      }
    },
  };

  useEffect(() => {
    actions.getList();
  }, [data]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return {
    list,
    createNewTask: actions.createNew,
    loading,
  };
};
