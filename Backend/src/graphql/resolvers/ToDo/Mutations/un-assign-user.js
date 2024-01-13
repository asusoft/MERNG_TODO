import { ObjectId } from "mongodb";

export const unAssignUserToToDoResolver = async (_, { todoId, userId }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

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