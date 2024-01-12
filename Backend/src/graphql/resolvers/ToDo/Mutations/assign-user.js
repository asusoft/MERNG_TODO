import { ObjectId } from "mongodb";

export const assignUserToToDoResolver = async (_, { todoId, userId }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    console.log(todoId)
    const todo = await db.collection('ToDos').findOne({ _id: new ObjectId(todoId) });
    
    if (!todo) return null
    
    
    if (todo.assigneesId.find((dbId) => dbId.toString() === userId.toString())) return todo

   

    const result = await db.collection('ToDos')
        .updateOne({
            _id: new ObjectId(todoId)
        }, {
            $push: {
                assigneesId: new ObjectId(userId)
            }
        })

    if (result.acknowledged) {
        todo.assigneesId.push( new ObjectId(userId))
        return todo
    }

};