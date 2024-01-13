import { UserMutations } from './User/index.js'
import { TaskListMutations } from './TaskList/index.js';
import { ToDoMutations } from './ToDo/index.js';
import { FilesMutations } from './Files/index.js';

export const mutations = `
  ${UserMutations}
  ${TaskListMutations}
  ${ToDoMutations}
  ${FilesMutations}
`;