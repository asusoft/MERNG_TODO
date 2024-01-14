import { ObjectId } from "mongodb";

export const updateUserResolver = async (_, data, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    const result = await db.collection('Users')
        .updateOne({
            _id: new ObjectId(user._id)
        }, {
            $set: data
        })

    if (result.acknowledged) {
        const updated = await db.collection('Users').findOne({ _id: new ObjectId(user._id) })
        return updated
    }
};