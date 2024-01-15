/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation UploadFile($file: Upload!) {\n  uploadFile(file: $file)\n}": types.UploadFileDocument,
    "mutation AddUserToTask($taskListId: ID!, $userId: ID!) {\n  addUserToTaskList(taskListId: $taskListId, userId: $userId) {\n    ... on TaskList {\n      users {\n        ...FullUser\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.AddUserToTaskDocument,
    "mutation CreateTask($title: String!) {\n  createTaskList(title: $title) {\n    ... on TaskList {\n      createdAt\n      id\n      title\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.CreateTaskDocument,
    "mutation DeleteTask($deleteTaskListId: ID!) {\n  deleteTaskList(id: $deleteTaskListId)\n}": types.DeleteTaskDocument,
    "query GetMyTaskLists {\n  myTaskLists {\n    ... on TaskListArray {\n      taskLists {\n        createdAt\n        title\n        id\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.GetMyTaskListsDocument,
    "query GetTask($taskId: ID!) {\n  getTaskList(id: $taskId) {\n    ... on TaskList {\n      createdAt\n      id\n      progress\n      title\n      users {\n        ...FullUser\n      }\n      todos {\n        ...SimpleTodo\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.GetTaskDocument,
    "mutation RemoveUserFromTaskList($taskListId: ID!, $userId: ID!) {\n  removeUserFromTaskList(taskListId: $taskListId, userId: $userId) {\n    ... on TaskList {\n      users {\n        ...FullUser\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.RemoveUserFromTaskListDocument,
    "mutation UpdateTask($taskId: ID!, $title: String!) {\n  updateTaskList(id: $taskId, title: $title) {\n    ... on TaskList {\n      id\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.UpdateTaskDocument,
    "mutation AssignUserToToDo($todoId: ID!, $userId: ID!) {\n  assignUserToToDo(todoId: $todoId, userId: $userId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.AssignUserToToDoDocument,
    "mutation CreateTodo($content: String!, $taskListId: ID!, $todoId: ID) {\n  createToDo(content: $content, taskListId: $taskListId, todoId: $todoId) {\n    ... on ToDo {\n      id\n      content\n      isCompleted\n      taskList {\n        id\n        progress\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.CreateTodoDocument,
    "mutation DeleteToDo($todoId: ID!) {\n  deleteToDo(id: $todoId)\n}": types.DeleteToDoDocument,
    "query GetToDo($todoId: ID!) {\n  getToDo(id: $todoId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.GetToDoDocument,
    "mutation unAssignUserFromToDo($todoId: ID!, $userId: ID!) {\n  unAssignUserFromToDo(todoId: $todoId, userId: $userId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.UnAssignUserFromToDoDocument,
    "mutation UpdateToDo($todoId: ID!, $content: String, $isCompleted: Boolean) {\n  updateToDo(id: $todoId, content: $content, isCompleted: $isCompleted) {\n    ... on ToDo {\n      content\n      id\n      isCompleted\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.UpdateToDoDocument,
    "fragment SimpleSubtask on ToDo {\n  id\n  content\n  isCompleted\n  assignees {\n    ...FullUser\n  }\n}\n\nfragment SimpleTodo on ToDo {\n  id\n  content\n  isCompleted\n  assignees {\n    ...FullUser\n  }\n  subtasks {\n    ...SimpleSubtask\n  }\n  taskListId\n}": types.SimpleSubtaskFragmentDoc,
    "query GetAllUsers {\n  getAllUsers {\n    ...FullUser\n  }\n}": types.GetAllUsersDocument,
    "query GetMe {\n  getMe {\n    ... on User {\n      ...FullUser\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.GetMeDocument,
    "mutation SignIn($input: SignInInput) {\n  signIn(input: $input) {\n    ... on AuthUser {\n      user {\n        ...FullUser\n      }\n      token\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.SignInDocument,
    "mutation SignUp($input: SignUpInput) {\n  signUp(input: $input) {\n    ... on AuthUser {\n      user {\n        ...FullUser\n      }\n      token\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}": types.SignUpDocument,
    "mutation UpdateUser($name: String, $avatar: String) {\n  updateUser(name: $name, avatar: $avatar) {\n    ...FullUser\n  }\n}": types.UpdateUserDocument,
    "fragment FullUser on User {\n  avatar\n  email\n  id\n  name\n}": types.FullUserFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UploadFile($file: Upload!) {\n  uploadFile(file: $file)\n}"): (typeof documents)["mutation UploadFile($file: Upload!) {\n  uploadFile(file: $file)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddUserToTask($taskListId: ID!, $userId: ID!) {\n  addUserToTaskList(taskListId: $taskListId, userId: $userId) {\n    ... on TaskList {\n      users {\n        ...FullUser\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation AddUserToTask($taskListId: ID!, $userId: ID!) {\n  addUserToTaskList(taskListId: $taskListId, userId: $userId) {\n    ... on TaskList {\n      users {\n        ...FullUser\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTask($title: String!) {\n  createTaskList(title: $title) {\n    ... on TaskList {\n      createdAt\n      id\n      title\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation CreateTask($title: String!) {\n  createTaskList(title: $title) {\n    ... on TaskList {\n      createdAt\n      id\n      title\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTask($deleteTaskListId: ID!) {\n  deleteTaskList(id: $deleteTaskListId)\n}"): (typeof documents)["mutation DeleteTask($deleteTaskListId: ID!) {\n  deleteTaskList(id: $deleteTaskListId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMyTaskLists {\n  myTaskLists {\n    ... on TaskListArray {\n      taskLists {\n        createdAt\n        title\n        id\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["query GetMyTaskLists {\n  myTaskLists {\n    ... on TaskListArray {\n      taskLists {\n        createdAt\n        title\n        id\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTask($taskId: ID!) {\n  getTaskList(id: $taskId) {\n    ... on TaskList {\n      createdAt\n      id\n      progress\n      title\n      users {\n        ...FullUser\n      }\n      todos {\n        ...SimpleTodo\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["query GetTask($taskId: ID!) {\n  getTaskList(id: $taskId) {\n    ... on TaskList {\n      createdAt\n      id\n      progress\n      title\n      users {\n        ...FullUser\n      }\n      todos {\n        ...SimpleTodo\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveUserFromTaskList($taskListId: ID!, $userId: ID!) {\n  removeUserFromTaskList(taskListId: $taskListId, userId: $userId) {\n    ... on TaskList {\n      users {\n        ...FullUser\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation RemoveUserFromTaskList($taskListId: ID!, $userId: ID!) {\n  removeUserFromTaskList(taskListId: $taskListId, userId: $userId) {\n    ... on TaskList {\n      users {\n        ...FullUser\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTask($taskId: ID!, $title: String!) {\n  updateTaskList(id: $taskId, title: $title) {\n    ... on TaskList {\n      id\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation UpdateTask($taskId: ID!, $title: String!) {\n  updateTaskList(id: $taskId, title: $title) {\n    ... on TaskList {\n      id\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignUserToToDo($todoId: ID!, $userId: ID!) {\n  assignUserToToDo(todoId: $todoId, userId: $userId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation AssignUserToToDo($todoId: ID!, $userId: ID!) {\n  assignUserToToDo(todoId: $todoId, userId: $userId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTodo($content: String!, $taskListId: ID!, $todoId: ID) {\n  createToDo(content: $content, taskListId: $taskListId, todoId: $todoId) {\n    ... on ToDo {\n      id\n      content\n      isCompleted\n      taskList {\n        id\n        progress\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation CreateTodo($content: String!, $taskListId: ID!, $todoId: ID) {\n  createToDo(content: $content, taskListId: $taskListId, todoId: $todoId) {\n    ... on ToDo {\n      id\n      content\n      isCompleted\n      taskList {\n        id\n        progress\n      }\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteToDo($todoId: ID!) {\n  deleteToDo(id: $todoId)\n}"): (typeof documents)["mutation DeleteToDo($todoId: ID!) {\n  deleteToDo(id: $todoId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetToDo($todoId: ID!) {\n  getToDo(id: $todoId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["query GetToDo($todoId: ID!) {\n  getToDo(id: $todoId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation unAssignUserFromToDo($todoId: ID!, $userId: ID!) {\n  unAssignUserFromToDo(todoId: $todoId, userId: $userId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation unAssignUserFromToDo($todoId: ID!, $userId: ID!) {\n  unAssignUserFromToDo(todoId: $todoId, userId: $userId) {\n    ... on ToDo {\n      ...SimpleTodo\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateToDo($todoId: ID!, $content: String, $isCompleted: Boolean) {\n  updateToDo(id: $todoId, content: $content, isCompleted: $isCompleted) {\n    ... on ToDo {\n      content\n      id\n      isCompleted\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation UpdateToDo($todoId: ID!, $content: String, $isCompleted: Boolean) {\n  updateToDo(id: $todoId, content: $content, isCompleted: $isCompleted) {\n    ... on ToDo {\n      content\n      id\n      isCompleted\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SimpleSubtask on ToDo {\n  id\n  content\n  isCompleted\n  assignees {\n    ...FullUser\n  }\n}\n\nfragment SimpleTodo on ToDo {\n  id\n  content\n  isCompleted\n  assignees {\n    ...FullUser\n  }\n  subtasks {\n    ...SimpleSubtask\n  }\n  taskListId\n}"): (typeof documents)["fragment SimpleSubtask on ToDo {\n  id\n  content\n  isCompleted\n  assignees {\n    ...FullUser\n  }\n}\n\nfragment SimpleTodo on ToDo {\n  id\n  content\n  isCompleted\n  assignees {\n    ...FullUser\n  }\n  subtasks {\n    ...SimpleSubtask\n  }\n  taskListId\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllUsers {\n  getAllUsers {\n    ...FullUser\n  }\n}"): (typeof documents)["query GetAllUsers {\n  getAllUsers {\n    ...FullUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMe {\n  getMe {\n    ... on User {\n      ...FullUser\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["query GetMe {\n  getMe {\n    ... on User {\n      ...FullUser\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignIn($input: SignInInput) {\n  signIn(input: $input) {\n    ... on AuthUser {\n      user {\n        ...FullUser\n      }\n      token\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation SignIn($input: SignInInput) {\n  signIn(input: $input) {\n    ... on AuthUser {\n      user {\n        ...FullUser\n      }\n      token\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignUp($input: SignUpInput) {\n  signUp(input: $input) {\n    ... on AuthUser {\n      user {\n        ...FullUser\n      }\n      token\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"): (typeof documents)["mutation SignUp($input: SignUpInput) {\n  signUp(input: $input) {\n    ... on AuthUser {\n      user {\n        ...FullUser\n      }\n      token\n    }\n    ... on BaseError {\n      status\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($name: String, $avatar: String) {\n  updateUser(name: $name, avatar: $avatar) {\n    ...FullUser\n  }\n}"): (typeof documents)["mutation UpdateUser($name: String, $avatar: String) {\n  updateUser(name: $name, avatar: $avatar) {\n    ...FullUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FullUser on User {\n  avatar\n  email\n  id\n  name\n}"): (typeof documents)["fragment FullUser on User {\n  avatar\n  email\n  id\n  name\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;