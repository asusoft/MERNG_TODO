import {useEffect, useState} from 'react';

import {
  useCreateTodoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
  useGetToDoQuery,
  SimpleSubtaskFragment,
} from '../../../shared/generated/types/graphql';

export const useToDo = (id: string) => {
  const [subtasks, setSubtasks] = useState<SimpleSubtaskFragment[]>([]);
  const [taskListId, setTasklistId] = useState('');

  const {data, loading, error, refetch} = useGetToDoQuery({
    variables: {todoId: id},
  });

  const [createToDo] = useCreateTodoMutation();
  const [updateToDo] = useUpdateToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();

  const actions = {
    getList: async () => {
      if (data) {
        const list = data.getToDo.subtasks;
        setSubtasks(list);
        setTasklistId(data.getToDo.taskListId)
      }
    },
    createSubTask: async (index: number) => {
      const response = await createToDo({
        variables: {content: '', taskListId, todoId: id},
      });

      console.log("response")
      const newSubtasks = [...subtasks];

      console.log(response)

      newSubtasks.splice(index, 0, {
        id: response.data?.createToDo?.id || '',
        content: '',
        isCompleted: false,
        assignees: [],
      });

      setSubtasks(newSubtasks);
    },
    deleteSubtask: async (todoId: string) => {
      const response = await deleteToDo({variables: {todoId}});
      if (response.data?.deleteToDo) {
        setSubtasks(state => {
          if (state && Array.isArray(state)) {
            return state.filter(item => item.id !== todoId);
          }
          return state;
        });
      }
    },
    updateSubtask: async (id: string, checked: boolean, content: string) => {
      const response = await updateToDo({
        variables: {
          todoId: id,
          content,
          isCompleted: checked,
        },
      });
      refetch();
    }
  };

  useEffect(() => {
    actions.getList();
  }, [data]);

  // useEffect(() => {console.log(subtasks)}, [subtasks])

  return {
    subtasks,
    actions,
    loading,
  };
};
