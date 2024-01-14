import { ObjectId } from "mongodb";

export const ToDoCustomResolvers = {
    ToDo: {
        id: ({ _id, id }) => _id || id,
        taskList: async ({ taskListId }, _, { db }) => await db.collection('TaskList').findOne({ _id: taskListId }),
        assignees: async ({ assigneesId }, _, { db }) => Promise.all(
            assigneesId.map((id) => (
                db.collection('Users').findOne({ _id: id }))
            )
        ),
        subtasks: async ({ _id }, _, { db }) => await db.collection('ToDos').find({ todoId: new ObjectId(_id) }).toArray(),
    },
    ToDoOrBE: {
        __resolveType(obj, _, __){
            if(obj._id || obj.id){
                return 'ToDo';
            }
            if(obj.status){
                return 'BaseError';
            }
            return null;
        },
    },
};
