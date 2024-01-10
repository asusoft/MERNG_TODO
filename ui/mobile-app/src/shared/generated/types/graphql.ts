import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthUser = {
  __typename?: 'AuthUser';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToTaskList?: Maybe<TaskList>;
  createTaskList: TaskList;
  createToDo: ToDo;
  deleteTaskList: Scalars['Boolean']['output'];
  deleteToDo: Scalars['Boolean']['output'];
  signIn: AuthUser;
  signUp: AuthUser;
  updateTaskList: TaskList;
  updateToDo: ToDo;
};


export type MutationAddUserToTaskListArgs = {
  taskListId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateTaskListArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateToDoArgs = {
  content: Scalars['String']['input'];
  taskListId: Scalars['ID']['input'];
};


export type MutationDeleteTaskListArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteToDoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  input?: InputMaybe<SignInInput>;
};


export type MutationSignUpArgs = {
  input?: InputMaybe<SignUpInput>;
};


export type MutationUpdateTaskListArgs = {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateToDoArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getTaskList: TaskList;
  getToDo: ToDo;
  myTaskLists: Array<SimpleTask>;
};


export type QueryGetTaskListArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetToDoArgs = {
  content: Scalars['String']['input'];
  taskListId: Scalars['ID']['input'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SimpleTask = {
  __typename?: 'SimpleTask';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type SimpleTodo = {
  __typename?: 'SimpleTodo';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
};

export type TaskList = {
  __typename?: 'TaskList';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  progress: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  todos: Array<ToDo>;
  users: Array<User>;
};

export type ToDo = {
  __typename?: 'ToDo';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  taskList: TaskList;
  taskListId: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AddUserToTaskMutationVariables = Exact<{
  taskListId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type AddUserToTaskMutation = { __typename?: 'Mutation', addUserToTaskList?: { __typename?: 'TaskList', users: Array<{ __typename?: 'User', avatar?: string | null, email: string, id: string, name: string }> } | null };

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTaskList: { __typename?: 'TaskList', createdAt: string, id: string, title: string } };

export type DeleteTaskMutationVariables = Exact<{
  deleteTaskListId: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTaskList: boolean };

export type GetMyTaskListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTaskListsQuery = { __typename?: 'Query', myTaskLists: Array<{ __typename?: 'SimpleTask', createdAt: string, id: string, title: string }> };

export type GetTaskQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTaskList: { __typename?: 'TaskList', createdAt: string, id: string, progress: number, title: string, users: Array<{ __typename?: 'User', avatar?: string | null, name: string, email: string, id: string }>, todos: Array<{ __typename?: 'ToDo', id: string, content: string, isCompleted: boolean }> } };

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTaskList: { __typename?: 'TaskList', id: string } };

export type SimpleTodoFragment = { __typename?: 'ToDo', id: string, content: string, isCompleted: boolean };

export type CreateTodoMutationVariables = Exact<{
  content: Scalars['String']['input'];
  taskListId: Scalars['ID']['input'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createToDo: { __typename?: 'ToDo', id: string, content: string, isCompleted: boolean, taskList: { __typename?: 'TaskList', id: string, progress: number } } };

export type DeleteToDoMutationVariables = Exact<{
  todoId: Scalars['ID']['input'];
}>;


export type DeleteToDoMutation = { __typename?: 'Mutation', deleteToDo: boolean };

export type UpdateToDoMutationVariables = Exact<{
  todoId: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateToDoMutation = { __typename?: 'Mutation', updateToDo: { __typename?: 'ToDo', content: string, id: string, isCompleted: boolean } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', email: string, id: string, avatar?: string | null, name: string }> };

export type SignInMutationVariables = Exact<{
  signInInput?: InputMaybe<SignInInput>;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthUser', token: string, user: { __typename?: 'User', avatar?: string | null, email: string, id: string, name: string } } };

export type SignUpMutationVariables = Exact<{
  input?: InputMaybe<SignUpInput>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthUser', token: string, user: { __typename?: 'User', name: string, id: string, email: string, avatar?: string | null } } };

export const SimpleTodoFragmentDoc = gql`
    fragment SimpleTodo on ToDo {
  id
  content
  isCompleted
}
    `;
export const AddUserToTaskDocument = gql`
    mutation AddUserToTask($taskListId: ID!, $userId: ID!) {
  addUserToTaskList(taskListId: $taskListId, userId: $userId) {
    users {
      avatar
      email
      id
      name
    }
  }
}
    `;
export type AddUserToTaskMutationFn = Apollo.MutationFunction<AddUserToTaskMutation, AddUserToTaskMutationVariables>;

/**
 * __useAddUserToTaskMutation__
 *
 * To run a mutation, you first call `useAddUserToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToTaskMutation, { data, loading, error }] = useAddUserToTaskMutation({
 *   variables: {
 *      taskListId: // value for 'taskListId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddUserToTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToTaskMutation, AddUserToTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToTaskMutation, AddUserToTaskMutationVariables>(AddUserToTaskDocument, options);
      }
export type AddUserToTaskMutationHookResult = ReturnType<typeof useAddUserToTaskMutation>;
export type AddUserToTaskMutationResult = Apollo.MutationResult<AddUserToTaskMutation>;
export type AddUserToTaskMutationOptions = Apollo.BaseMutationOptions<AddUserToTaskMutation, AddUserToTaskMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!) {
  createTaskList(title: $title) {
    createdAt
    id
    title
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($deleteTaskListId: ID!) {
  deleteTaskList(id: $deleteTaskListId)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      deleteTaskListId: // value for 'deleteTaskListId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetMyTaskListsDocument = gql`
    query GetMyTaskLists {
  myTaskLists {
    createdAt
    id
    title
  }
}
    `;

/**
 * __useGetMyTaskListsQuery__
 *
 * To run a query within a React component, call `useGetMyTaskListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTaskListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTaskListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTaskListsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTaskListsQuery, GetMyTaskListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTaskListsQuery, GetMyTaskListsQueryVariables>(GetMyTaskListsDocument, options);
      }
export function useGetMyTaskListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTaskListsQuery, GetMyTaskListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTaskListsQuery, GetMyTaskListsQueryVariables>(GetMyTaskListsDocument, options);
        }
export function useGetMyTaskListsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyTaskListsQuery, GetMyTaskListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyTaskListsQuery, GetMyTaskListsQueryVariables>(GetMyTaskListsDocument, options);
        }
export type GetMyTaskListsQueryHookResult = ReturnType<typeof useGetMyTaskListsQuery>;
export type GetMyTaskListsLazyQueryHookResult = ReturnType<typeof useGetMyTaskListsLazyQuery>;
export type GetMyTaskListsSuspenseQueryHookResult = ReturnType<typeof useGetMyTaskListsSuspenseQuery>;
export type GetMyTaskListsQueryResult = Apollo.QueryResult<GetMyTaskListsQuery, GetMyTaskListsQueryVariables>;
export const GetTaskDocument = gql`
    query GetTask($taskId: ID!) {
  getTaskList(id: $taskId) {
    createdAt
    id
    progress
    title
    users {
      avatar
      name
      email
      id
    }
    todos {
      ...SimpleTodo
    }
  }
}
    ${SimpleTodoFragmentDoc}`;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<typeof useGetTaskSuspenseQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($taskId: ID!, $title: String!) {
  updateTaskList(id: $taskId, title: $title) {
    id
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const CreateTodoDocument = gql`
    mutation CreateTodo($content: String!, $taskListId: ID!) {
  createToDo(content: $content, taskListId: $taskListId) {
    id
    content
    isCompleted
    taskList {
      id
      progress
    }
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      content: // value for 'content'
 *      taskListId: // value for 'taskListId'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const DeleteToDoDocument = gql`
    mutation DeleteToDo($todoId: ID!) {
  deleteToDo(id: $todoId)
}
    `;
export type DeleteToDoMutationFn = Apollo.MutationFunction<DeleteToDoMutation, DeleteToDoMutationVariables>;

/**
 * __useDeleteToDoMutation__
 *
 * To run a mutation, you first call `useDeleteToDoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteToDoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteToDoMutation, { data, loading, error }] = useDeleteToDoMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useDeleteToDoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteToDoMutation, DeleteToDoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteToDoMutation, DeleteToDoMutationVariables>(DeleteToDoDocument, options);
      }
export type DeleteToDoMutationHookResult = ReturnType<typeof useDeleteToDoMutation>;
export type DeleteToDoMutationResult = Apollo.MutationResult<DeleteToDoMutation>;
export type DeleteToDoMutationOptions = Apollo.BaseMutationOptions<DeleteToDoMutation, DeleteToDoMutationVariables>;
export const UpdateToDoDocument = gql`
    mutation UpdateToDo($todoId: ID!, $content: String, $isCompleted: Boolean) {
  updateToDo(id: $todoId, content: $content, isCompleted: $isCompleted) {
    content
    id
    isCompleted
  }
}
    `;
export type UpdateToDoMutationFn = Apollo.MutationFunction<UpdateToDoMutation, UpdateToDoMutationVariables>;

/**
 * __useUpdateToDoMutation__
 *
 * To run a mutation, you first call `useUpdateToDoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateToDoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateToDoMutation, { data, loading, error }] = useUpdateToDoMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      content: // value for 'content'
 *      isCompleted: // value for 'isCompleted'
 *   },
 * });
 */
export function useUpdateToDoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateToDoMutation, UpdateToDoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateToDoMutation, UpdateToDoMutationVariables>(UpdateToDoDocument, options);
      }
export type UpdateToDoMutationHookResult = ReturnType<typeof useUpdateToDoMutation>;
export type UpdateToDoMutationResult = Apollo.MutationResult<UpdateToDoMutation>;
export type UpdateToDoMutationOptions = Apollo.BaseMutationOptions<UpdateToDoMutation, UpdateToDoMutationVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    email
    id
    avatar
    name
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($signInInput: SignInInput) {
  signIn(input: $signInInput) {
    token
    user {
      avatar
      email
      id
      name
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      signInInput: // value for 'signInInput'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput) {
  signUp(input: $input) {
    token
    user {
      name
      id
      email
      avatar
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;