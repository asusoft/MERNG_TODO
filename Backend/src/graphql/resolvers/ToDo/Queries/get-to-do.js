import { ObjectId } from "mongodb";

export const getToDoResolver = async (_, { id }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    return await db.collection('ToDos').findOne({ _id: new ObjectId(id) })

};