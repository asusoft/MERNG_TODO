import { TaskListQuery } from './taskList.js'
import { UserQuery } from './user.js';
import { ToDoQuery } from './todo.js';

export const queries = `
  ${TaskListQuery}
  ${UserQuery}
  ${ToDoQuery}
`;