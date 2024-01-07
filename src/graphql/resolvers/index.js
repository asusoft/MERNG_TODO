import { UserMutationResolvers } from './User/Mutations/index.js';
import { UserCustomResolvers } from './User/index.js';
import { TaskListMutationResolvers } from './TaskList/Mutations/index.js';
import { TaskListQueriesResolvers } from './TaskList/Queries/index.js';
import { TaskListCustomResolvers } from './TaskList/index.js';
import { ToDoMutationResolvers } from './ToDo/Mutations/index.js';
import { ToDoCustomResolvers } from './ToDo/index.js';
import { ObjectId } from 'mongodb';

const resolvers = {
    Query: {
        ...TaskListQueriesResolvers
    },
    Mutation: {
        ...UserMutationResolvers,
        ...TaskListMutationResolvers,
        ...ToDoMutationResolvers
    },
    ...UserCustomResolvers,
    ...TaskListCustomResolvers,
    ...ToDoCustomResolvers,
};
export default resolvers;
