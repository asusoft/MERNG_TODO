export const ToDoMutations = `
    type Mutation {
        createToDo(content: String!, taskListId: ID!, todoId: ID): ToDo!
        updateToDo(id: ID!, content: String, isCompleted: Boolean): ToDo!
        deleteToDo(id: ID!): Boolean!
        assignUserToToDo(todoId: ID!, userId: ID!): ToDo!
        unAssignUserFromToDo(todoId: ID!, userId: ID!): ToDo!
    }
`;