import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";


export const createToDoResolver = async (_, { content, taskListId, todoId }, { db, user }) => {
    if(!user) return { status: ErrorStatus.NOT_AUTHENTICATED };

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