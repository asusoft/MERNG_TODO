import { createToDoResolver } from "./create-to-do.js";
import { updateToDoResolver } from "./update-to-do.js";
import { deleteToDoResolver } from "./delete-to-do.js";

export const ToDoMutationResolvers = {
    createToDo: createToDoResolver,
    updateToDo: updateToDoResolver,
    deleteToDo: deleteToDoResolver,
};