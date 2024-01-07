export const TaskListQuery = `
    type Query {
        myTaskLists: [TaskList!]!
        getTaskList(id: ID!): TaskList!
    }
`;