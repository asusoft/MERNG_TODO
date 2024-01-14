import { UserType } from './user.js';
import { TaskListType } from './taskList.js';
import { TodoType } from './todo.js';
import { FilesType } from './files.js';
import { SharedTypes } from './shared.js';

export const types = `
  ${UserType}
  ${TaskListType}
  ${TodoType}
  ${FilesType}
  ${SharedTypes}
`;