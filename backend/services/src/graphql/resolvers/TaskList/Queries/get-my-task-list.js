import { ErrorStatus } from "../../../../helpers/Constants.js";

export const getMyTaskListResolver = async (_, __, { db, user }) => {
    if (!user) return { status: ErrorStatus.NOT_AUTHENTICATED };

    const taskLists = await db.collection('TaskList')
        .find({ userIds: user._id })
        .toArray();

    return { taskLists }; // Note: Returning an object with a taskLists property
};
