import { ObjectId } from "mongodb";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const updateToDoResolver = async (_, data, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED };

    const result = await db.collection('ToDos')
        .updateOne({
            _id: new ObjectId(data.id)
        }, {
            $set: data
        })

    if (result.acknowledged) {
        const todo = await db.collection('ToDos').findOne({ _id: new ObjectId(data.id) });
        return todo
    }

};