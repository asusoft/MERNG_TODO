import { createToDoResolver } from "./create-to-do.js";
import { updateToDoResolver } from "./update-to-do.js";
import { deleteToDoResolver } from "./delete-to-do.js";
import { assignUserToToDoResolver } from "./assign-user.js";
import { unAssignUserToToDoResolver } from "./un-assign-user.js";

export const ToDoMutationResolvers = {
    createToDo: createToDoResolver,
    updateToDo: updateToDoResolver,
    deleteToDo: deleteToDoResolver,
    assignUserToToDo: assignUserToToDoResolver,
    unAssignUserFromToDo: unAssignUserToToDoResolver
};