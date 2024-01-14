import { ObjectId } from "mongodb";

export const TaskListCustomResolvers = {
    TaskList: {
        id: ({ _id, id }) => _id || id,
        progress: async ({ _id }, _, { db }) => {
            const todos = await db.collection('ToDos').find({
                taskListId: new ObjectId(_id),
                $or: [
                    { todoId: null },
                    { todoId: "" }
                ]
            }).toArray();


            const completed = todos.filter(todo => todo.isCompleted)

            if (completed.length === 0) return 0

            return 100 * completed.length / todos.length

        },
        users: async ({ userIds }, _, { db }) => Promise.all(
            userIds.map((userId) => (
                db.collection('Users').findOne({ _id: userId }))
            )
        ),
        todos: async ({ _id }, _, { db }) => await db.collection('ToDos').find({
            taskListId: new ObjectId(_id),
            $or: [
                { todoId: null },
                { todoId: "" }
            ]
        }).toArray(),
    },
    TaskListOrBE: {
        __resolveType(obj, _, __){
            if(obj._id || obj.id){
                return 'TaskList';
            }
            if(obj.status){
                return 'BaseError';
            }
            return null;
        },
    },
    ListOrBE: {
        __resolveType(obj, _, __){
            if(obj.taskLists){
                return 'TaskListArray';
            }
            if(obj.status){
                return 'BaseError';
            }
            return null;
        }
    },
};
