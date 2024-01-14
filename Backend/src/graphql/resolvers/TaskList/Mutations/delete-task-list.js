import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const deleteTaskListResolver = async (_, { id }, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED }

    const result = await db.collection('TaskList').deleteOne({ _id: new ObjectId(id) })

    if (result.acknowledged)
        await db.collection('ToDos')
            .deleteMany({
                taskListId
                    : new ObjectId(id)
            })

    return result.acknowledged
};