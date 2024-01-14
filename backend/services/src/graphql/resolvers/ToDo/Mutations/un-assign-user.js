import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const unAssignUserToToDoResolver = async (_, { todoId, userId }, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED };

    const todo = await db.collection('ToDos').findOne({ _id: new ObjectId(todoId) });
    
    if (!todo) return null
    
    
    if (!todo.assigneesId.find((dbId) => dbId.toString() === userId.toString())) return todo

    const result = await db.collection('ToDos')
        .updateOne({
            _id: new ObjectId(todoId)
        }, {
            $pull: {
                assigneesId: new ObjectId(userId)
            }
        })

    if (result.acknowledged) {
        todo.assigneesId = todo.assigneesId.filter(id => id.toString() !== userId.toString());
        return todo
    }

};