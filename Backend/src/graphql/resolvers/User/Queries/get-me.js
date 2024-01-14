import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const getMeResolver = async (_, __, { db, user }) => {
    if (!user) {
        return { status: ErrorStatus.NOT_AUTHENTICATED };
    }

    return await db.collection('Users').findOne({ _id: new ObjectId(user._id) })
};