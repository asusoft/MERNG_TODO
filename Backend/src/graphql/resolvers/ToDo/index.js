export const ToDoCustomResolvers = {
    ToDo: {
        id: ({ _id, id }) => _id || id,
        taskList: async ({ taskListId }, _, { db }) => await db.collection('TaskList').findOne({ _id: taskListId })
    }
};
