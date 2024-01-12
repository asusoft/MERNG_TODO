export const TodoType = `
    type ToDo {
        id: ID!
        content: String!
        isCompleted: Boolean!
        taskListId: ID!
        taskList: TaskList!
        assignees: [User!]!
    }
`;