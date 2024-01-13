import {useEffect, useState} from 'react';
import {
  useGetTaskQuery,
  SimpleTodoFragment,
  useCreateTodoMutation,
  useUpdateTaskMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
  User,
  useGetAllUsersQuery,
  useAddUserToTaskMutation,
  useAssignUserToToDoMutation,
  useUnAssignUserFromToDoMutation,
  useRemoveUserFromTaskListMutation,
} from '../../../shared/generated/types/graphql';
import {useIsFocused} from '@react-navigation/native';

export const useToDoList = (id: string) => {
  const isFocused = useIsFocused();
  const [list, setList] = useState<SimpleTodoFragment[]>([]);
  const [subtasks, setSubtasks] = useState<SimpleTodoFragment[]>([]);
  const [users, setUsers] = useState<User[] | undefined>([]);
  const [addedUsers, setAddedUsers] = useState<User[] | undefined>([]);
  const [title, setTitle] = useState('');
  const [progress, setProgess] = useState(0);
  const {data, loading, error, refetch} = useGetTaskQuery({
    variables: {taskId: id},
  });
  const {data: unaddedUsers, refetch: refechUnaddedUsers} =
    useGetAllUsersQuery();

  const [createToDo] = useCreateTodoMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [updateToDo] = useUpdateToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();
  const [addUser] = useAddUserToTaskMutation();
  const [removeUser] = useRemoveUserFromTaskListMutation();
  const [assignUser] = useAssignUserToToDoMutation();
  const [unAssignUser] = useUnAssignUserFromToDoMutation();

  const actions = {
    getList: async () => {
      if (data) {
        const list = data.getTaskList.todos;
        setList(list);
        setTitle(data.getTaskList.title);
        setAddedUsers(data.getTaskList.users);
        const prog = data.getTaskList.progress / 100;
        setProgess(prog);
      }
    },
    getUnAddedUsers: async () => {
      if (unaddedUsers) {
        const list = unaddedUsers.getAllUsers;
        const unaddedList = list.filter(item => {
          return !addedUsers?.some(addedUser => addedUser.id === item.id);
        });
        setUsers(unaddedList);
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
        assignees: [],
        subtasks: [],
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
      const response = await updateToDo({
        variables: {
          todoId: id,
          content,
          isCompleted: checked,
        },
      });
      refetch();
    },
    addUserToTask: async (userId: string) => {
      const response = await addUser({
        variables: {
          taskListId: id,
          userId,
        },
      });

      if (response.data) {
        setAddedUsers(response.data.addUserToTaskList?.users);
        if (response.data) {
          setUsers(state => {
            if (state && Array.isArray(state)) {
              return state.filter(item => item.id !== userId);
            }
            return state;
          });
        }
      }
    },
    removeUserFromTask: async (userId: string) => {
      const response = await removeUser({
        variables: {
          taskListId: id,
          userId,
        },
      });

      if (response.data) {
        refetch();
        actions.getUnAddedUsers();
      }
    },
    assignUserToToDO: async (todoId: string, userId: string) => {
      const response = await assignUser({
        variables: {
          todoId,
          userId,
        },
      });

      if (response.data) {
        refetch();
      }
    },
    unAssignUserToToDO: async (todoId: string, userId: string) => {
      const response = await unAssignUser({
        variables: {
          todoId,
          userId,
        },
      });

      if (response.data) {
        refetch();
      }
    },
  };

  const subtaskActions = {
    create: async (index: number, todoId: string) => {
      const response = await createToDo({
        variables: {content: '', taskListId: id, todoId},
      });
      const newTodos = [...list];

      newTodos.splice(index, 0, {
        id: response.data?.createToDo?.id || '',
        content: '',
        isCompleted: false,
        assignees: [],
        subtasks: [],
      });

      setList(newTodos);
    },
    delete: async (todoId: string) => {
      const response = await deleteToDo({variables: {todoId}});
      refetch()
    },
    update: async (id: string, checked: boolean, content: string) => {
      const response = await updateToDo({
        variables: {
          todoId: id,
          content,
          isCompleted: checked,
        },
      });
      refetch();
    },
  }

  useEffect(() => {
    actions.getList();
  }, [data]);

  useEffect(() => {
    actions.getUnAddedUsers();
  }, [unaddedUsers]);

  useEffect(() => {
    if (isFocused) {
      refetch();
      refechUnaddedUsers();
    }
  }, [isFocused]);

  return {
    list,
    actions,
    loading,
    title,
    addedUsers,
    users,
    progress,
    subtaskActions
  };
};
