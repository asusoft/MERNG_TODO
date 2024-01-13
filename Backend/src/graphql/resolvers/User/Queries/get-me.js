import { ObjectId } from "mongodb";

export const getMeResolver = async (_, __, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    return await db.collection('Users').findOne({ _id: new ObjectId(user._id) })
};