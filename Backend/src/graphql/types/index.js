import { UserType } from './user.js';
import { TaskListType } from './taskList.js';
import { TodoType } from './todo.js';
import { FilesType } from './files.js';

export const types = `
  ${UserType}
  ${TaskListType}
  ${TodoType}
  ${FilesType}
`;