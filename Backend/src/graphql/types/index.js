import { UserType } from './user.js';
import { TaskListType } from './taskList.js';
import { TodoType } from './todo.js';

export const types = `
  scalar Upload
  ${UserType}
  ${TaskListType}
  ${TodoType}
`;