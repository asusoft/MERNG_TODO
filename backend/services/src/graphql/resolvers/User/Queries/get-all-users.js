export const getAllUsersResolver = async (_, __, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }
    return await db.collection('Users').find().toArray()
};