export const TaskListQuery = `
    type Query {
        myTaskLists: ListOrBE!
        getTaskList(id: ID!): TaskListOrBE!
    }
`;