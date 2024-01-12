import { createTaskListResolver } from "./create-task-list.js";
import { updateTaskListResolver } from "./update-task-list.js";
import { deleteTaskListResolver } from "./delete-task-list.js";
import { addUserToTaskListResolver } from "./add-user-to-task-list.js";
import { removeUserFromTaskListResolver } from "./remove-user-from-task-list.js";

export const TaskListMutationResolvers = {
    createTaskList: createTaskListResolver,
    updateTaskList: updateTaskListResolver,
    deleteTaskList: deleteTaskListResolver,
    addUserToTaskList: addUserToTaskListResolver,
    removeUserFromTaskList: removeUserFromTaskListResolver
};