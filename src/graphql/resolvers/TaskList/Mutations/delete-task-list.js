import { ObjectId } from "mongodb";

export const deleteTaskListResolver = async (_, { id, title }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    const result = await db.collection('TaskList').deleteOne({ _id: new ObjectId(id) })

    return result.acknowledged
};