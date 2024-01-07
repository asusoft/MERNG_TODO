import { ObjectId } from "mongodb";

export const getTaskListResolver = async (_, { id }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    return await db.collection('TaskList').findOne({ _id: new ObjectId(id) })

};