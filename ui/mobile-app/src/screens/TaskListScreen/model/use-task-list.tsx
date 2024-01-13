import {useEffect, useState} from 'react';
import {
  SimpleTask,
  useGetMyTaskListsQuery,
  useCreateTaskMutation,
  useGetMyTaskListsLazyQuery,
  useDeleteTaskMutation,
} from '../../../shared/generated/types/graphql';
import {useIsFocused} from '@react-navigation/native';

export const useTaskList = () => {
  const isFocused = useIsFocused();
  const [list, setList] = useState<SimpleTask[]>([]);
  const {data, loading, error, refetch} = useGetMyTaskListsQuery();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

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
    deleteTask: async (id: string) => {
      const response = await deleteTask({variables: {deleteTaskListId: id}});
      if (response.data?.deleteTaskList) {
        setList(state => {
          if (state && Array.isArray(state)) {
            return state.filter(item => item.id !== id);
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
    deleteTask: actions.deleteTask,
    loading,
  };
};
