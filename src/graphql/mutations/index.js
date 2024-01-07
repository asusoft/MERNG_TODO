import { UserMutations } from './User/index.js'
import { TaskListMutations } from './TaskList/index.js';

export const mutations = `
  ${UserMutations}
  ${TaskListMutations}
`;