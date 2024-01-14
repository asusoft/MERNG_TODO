import { useEffect, useState } from 'react';

import {
  useCreateTodoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
  useGetToDoQuery,
  SimpleSubtaskFragment,
  User,
  useAssignUserToToDoMutation,
  useUnAssignUserFromToDoMutation,
} from '../../shared/generated/types/graphql';

export const useToDo = (id: string) => {
  const [subtasks, setSubtasks] = useState<SimpleSubtaskFragment[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<User[] | undefined>([]);
  const [taskListId, setTasklistId] = useState('');

  const { data, loading, error, refetch } = useGetToDoQuery({
    variables: { todoId: id },
  });

  const [createToDo] = useCreateTodoMutation();
  const [updateToDo] = useUpdateToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();
  const [assignUser] = useAssignUserToToDoMutation();
  const [unAssignUser] = useUnAssignUserFromToDoMutation();

  const actions = {
    getList: async () => {
      if (data && data.getToDo.__typename === 'ToDo') {
        const list = data.getToDo.subtasks;
        setSubtasks(list);
        setTasklistId(data.getToDo.taskListId)
        setAssignedUsers(data.getToDo.assignees)
      }
    },
    createSubTask: async (index: number) => {
      const response = await createToDo({
        variables: { content: '', taskListId, todoId: id },
      });

      if (response.data?.createToDo.__typename === 'ToDo') {
        const newSubtasks = [...subtasks];

        newSubtasks.splice(index, 0, {
          id: response.data?.createToDo?.id || '',
          content: '',
          isCompleted: false,
          assignees: [],
        });

        setSubtasks(newSubtasks);
      }
    },
    deleteSubtask: async (todoId: string) => {
      const response = await deleteToDo({ variables: { todoId } });
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
    },
    assignUserToToDo: async (userId: string) => {
      const response = await assignUser({
        variables: {
          todoId: id,
          userId,
        },
      });
      if (response.data) {
        refetch();
      }
    },
    unAssignUserFromToDo: async (userId: string) => {

      const response = await unAssignUser({
        variables: {
          todoId: id,
          userId,
        },
      });
      if (response.data) {
        setAssignedUsers(state => {
          if (state && Array.isArray(state)) {
            return state.filter(item => item.id !== userId);
          }
          return state;
        });
      }
    },
  };

  useEffect(() => {
    actions.getList();
  }, [data]);

  return {
    subtasks,
    actions,
    loading,
    assignedUsers
  };
};
