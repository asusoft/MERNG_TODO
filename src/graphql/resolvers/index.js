import { UserMutationResolvers } from './User/Mutations/index.js';
import { TaskListMutationResolvers } from './TaskList/Mutations/index.js';
import { TaskListQueriesResolvers } from './TaskList/Queries/index.js';

const resolvers = {
    Query: {
        ...TaskListQueriesResolvers
    },
    Mutation: {
        ...UserMutationResolvers,
        ...TaskListMutationResolvers,
    },
    User: {
        id: ({ _id, id }) => _id || id
    },
    TaskList: {
        id: ({ _id, id }) => _id || id,
        progress: () => 0,
        users: async ({ userIds }, _, { db }) => Promise.all(
            userIds.map((userId) => (
                db.collection('Users').findOne({ _id: userId }))
            )
        )
    }
};
export default resolvers;
