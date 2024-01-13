import { UserMutationResolvers } from './User/Mutations/index.js';
import { UserCustomResolvers } from './User/index.js';
import { TaskListMutationResolvers } from './TaskList/Mutations/index.js';
import { TaskListQueriesResolvers } from './TaskList/Queries/index.js';
import { TaskListCustomResolvers } from './TaskList/index.js';
import { ToDoMutationResolvers } from './ToDo/Mutations/index.js';
import { ToDoCustomResolvers } from './ToDo/index.js';
import { UserQueriesResolvers } from './User/Queries/index.js';
import { ToDoQueriesResolvers } from './ToDo/Queries/index.js';
import { UploadFileResolver } from './upload-file.js';

const resolvers = {
    Query: {
        ...TaskListQueriesResolvers,
        ...UserQueriesResolvers,
        ...ToDoQueriesResolvers
    },
    Mutation: {
        ...UserMutationResolvers,
        ...TaskListMutationResolvers,
        ...ToDoMutationResolvers,
        uploadFile: UploadFileResolver
    },
    ...UserCustomResolvers,
    ...TaskListCustomResolvers,
    ...ToDoCustomResolvers,
};
export default resolvers;
