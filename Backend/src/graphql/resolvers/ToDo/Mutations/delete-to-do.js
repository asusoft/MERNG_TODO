import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const deleteToDoResolver = async (_, { id }, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED };

    const result = await db.collection('ToDos').deleteOne({ _id: new ObjectId(id) })

    return result.acknowledged
};