import { ObjectId } from "mongodb";

export const updateTaskListResolver = async (_, { id, title }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

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