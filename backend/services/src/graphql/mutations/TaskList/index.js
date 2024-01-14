export const TaskListMutations = `
    type Mutation {
        createTaskList(title: String!): TaskListOrBE!
        updateTaskList(id: ID!, title: String!): TaskListOrBE!
        deleteTaskList(id: ID!): Boolean!
        addUserToTaskList(taskListId: ID!, userId: ID!): TaskListOrBE
        removeUserFromTaskList(taskListId: ID!, userId: ID!): TaskListOrBE
    }
`;