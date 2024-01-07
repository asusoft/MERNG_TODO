export const getMyTaskListResolver = async (_, __, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    return await db.collection('TaskList')
        .find({ userIds: user._id })
        .toArray()

};