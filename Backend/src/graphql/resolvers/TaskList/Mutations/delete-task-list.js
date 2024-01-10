import { ObjectId } from "mongodb";

export const deleteTaskListResolver = async (_, { id }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    const result = await db.collection('TaskList').deleteOne({ _id: new ObjectId(id) })

    if (result.acknowledged)
        await db.collection('ToDos')
            .deleteMany({
                taskListId
                    : new ObjectId(id)
            })

    return result.acknowledged
};