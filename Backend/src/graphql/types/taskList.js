export const TaskListType = `
  union TaskListOrBE = TaskList | BaseError

  type TaskListArray {
    taskLists: [TaskList!]!
  }
  
  union ListOrBE = TaskListArray | BaseError
  
  type TaskList {
    id: ID!
    createdAt: String!
    title: String!
    progress: Float!
    users: [User!]!
    todos: [ToDo!]!
  }
`;

