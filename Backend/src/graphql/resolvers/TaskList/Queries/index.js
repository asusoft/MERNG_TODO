import { getMyTaskListResolver } from "./get-my-task-list.js";
import { getTaskListResolver } from "./get-task-list.js";

export const TaskListQueriesResolvers = {
    myTaskLists: getMyTaskListResolver,
    getTaskList: getTaskListResolver
};