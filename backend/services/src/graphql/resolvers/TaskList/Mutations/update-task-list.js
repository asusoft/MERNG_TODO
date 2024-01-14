import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const updateTaskListResolver = async (_, { id, title }, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED }

    const result = await db.collection('TaskList')
        .updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                title: title
            }
        })

    if (result.acknowledged) {
        const taskList = await db.collection('TaskList').findOne({ _id: new ObjectId(id) });
        return taskList
    }
};