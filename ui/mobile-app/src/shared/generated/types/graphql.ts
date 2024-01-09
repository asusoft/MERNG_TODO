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
  getTaskList: TaskList;
  getToDo: ToDo;
  getUser: User;
  myTaskLists: Array<SimpleTask>;
};


export type QueryGetTaskListArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetToDoArgs = {
  content: Scalars['String']['input'];
  taskListId: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
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

export type GetMyTaskListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTaskListsQuery = { __typename?: 'Query', myTaskLists: Array<{ __typename?: 'SimpleTask', createdAt: string, id: string, title: string }> };

export type GetTaskQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTaskList: { __typename?: 'TaskList', createdAt: string, id: string, progress: number, title: string, users: Array<{ __typename?: 'User', avatar?: string | null, name: string }>, todos: Array<{ __typename?: 'ToDo', id: string, content: string, isCompleted: boolean }> } };

export type SimpleTodoFragment = { __typename?: 'ToDo', id: string, content: string, isCompleted: boolean };

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