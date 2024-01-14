import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";


export const getToDoResolver = async (_, { id }, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED };

    return await db.collection('ToDos').findOne({ _id: new ObjectId(id) })

};