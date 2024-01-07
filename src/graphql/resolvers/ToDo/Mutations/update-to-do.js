import { ObjectId } from "mongodb";

export const updateToDoResolver = async (_, data, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    const result = await db.collection('ToDos')
        .updateOne({
            _id: new ObjectId(data.id)
        }, {
            $set: data
        })

    if (result.acknowledged) {
        const todo = await db.collection('ToDos').findOne({ _id: new ObjectId(data.id) });
        console.log(todo)
        return todo
    }

};