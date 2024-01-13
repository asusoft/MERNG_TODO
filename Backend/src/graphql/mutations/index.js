import { UserMutations } from './User/index.js'
import { TaskListMutations } from './TaskList/index.js';
import { ToDoMutations } from './ToDo/index.js';

export const mutations = `
  ${UserMutations}
  ${TaskListMutations}
  ${ToDoMutations}
  type Mutation {
    uploadFile(file: Upload!): String!
}
`;