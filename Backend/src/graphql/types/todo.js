export const TodoType = `
    union ToDoOrBE = ToDo | BaseError

    type ToDo {
        id: ID!
        content: String!
        isCompleted: Boolean!
        taskListId: ID!
        taskList: TaskList!
        assignees: [User!]!
        subtasks: [ToDo!]!
    }
`;