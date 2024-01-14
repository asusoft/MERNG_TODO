import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const removeUserFromTaskListResolver = async (_, { taskListId, userId }, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED }

    const taskList = await db.collection('TaskList').findOne({ _id: new ObjectId(taskListId) });

    if (!taskList) return null

    if (!taskList.userIds.find((dbId) => dbId.toString() === userId.toString())) return taskList

    const result = await db.collection('TaskList')
        .updateOne({
            _id: new ObjectId(taskListId)
        }, {
            $pull: {
                userIds: new ObjectId(userId)
            }
        })

    if (result.acknowledged) {
        taskList.userIds.push( new ObjectId(userId))
        return taskList
    }

};