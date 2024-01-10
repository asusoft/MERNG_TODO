import {useEffect, useState} from 'react';
import {
  useGetTaskQuery,
  SimpleTodoFragment,
  useCreateTodoMutation,
  useUpdateTaskMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
} from '../../../shared/generated/types/graphql';
import {useIsFocused} from '@react-navigation/native';

export const useToDoList = (id: string) => {
  const isFocused = useIsFocused();
  const [list, setList] = useState<SimpleTodoFragment[]>([]);
  const [title, setTitle] = useState('');
  const {data, loading, error, refetch} = useGetTaskQuery({
    variables: {taskId: id},
  });
  const [createToDo] = useCreateTodoMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [updateToDo] = useUpdateToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();

  const actions = {
    getList: async () => {
      if (data) {
        const list = data.getTaskList.todos;
        setList(list);
        setTitle(data.getTaskList.title);
      }
    },
    createNew: async (index: number) => {
      const response = await createToDo({
        variables: {content: '', taskListId: id},
      });
      const newTodos = [...list];

      newTodos.splice(index, 0, {
        id: response.data?.createToDo?.id || '',
        content: '',
        isCompleted: false,
      });

      setList(newTodos);
    },
    updateTask: async (title: string) => {
      await updateTask({variables: {taskId: id, title}});
    },
    deleteTodo: async (todoId: string) => {
      const response = await deleteToDo({variables: {todoId}});
      if (response.data?.deleteToDo) {
        setList(state => {
          if (state && Array.isArray(state)) {
            return state.filter(item => item.id !== todoId);
          }
          return state;
        });
      }
    },
    updateToDo: async (id: string, checked: boolean, content: string) => {
      await updateToDo({
        variables: {
          todoId: id,
          content,
          isCompleted: checked,
        },
      });
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
    actions,
    loading,
    title,
  };
};
