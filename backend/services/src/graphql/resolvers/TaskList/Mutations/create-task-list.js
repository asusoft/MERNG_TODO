import { ErrorStatus } from "../../../../helpers/Constants.js";

export const createTaskListResolver = async (_, { title }, { db, user }) => {
    if(!user)  return { status: ErrorStatus.NOT_AUTHENTICATED }

    const newTaskList = {
        title,
        createdAt: new Date().toISOString(),
        userIds: [user._id]
    }

    const result = await db.collection('TaskList').insertOne(newTaskList)

    if (result.acknowledged && result.insertedId) {
        const taskList = await db.collection('TaskList').findOne({ _id: result.insertedId });
        return taskList
    }
};