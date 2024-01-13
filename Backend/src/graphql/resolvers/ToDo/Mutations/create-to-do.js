import { ObjectId } from "mongodb";

export const createToDoResolver = async (_, { content, taskListId, todoId }, { db, user }) => {
    if(!user) { throw new Error('Unauthenticated') }

    const newToDo = {
        content,
        taskListId: new ObjectId(taskListId),
        isCompleted: false,
        todoId: new ObjectId(todoId) || '',
        assigneesId: []
    }

    const result = await db.collection('ToDos').insertOne(newToDo)

    if (result.acknowledged && result.insertedId) {
        const todo = await db.collection('ToDos').findOne({ _id: result.insertedId });
        return todo
    }

};