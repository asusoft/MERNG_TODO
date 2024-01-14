export const ToDoMutations = `
    type Mutation {
        createToDo(content: String!, taskListId: ID!, todoId: ID): ToDoOrBE!
        updateToDo(id: ID!, content: String, isCompleted: Boolean): ToDoOrBE!
        deleteToDo(id: ID!): Boolean!
        assignUserToToDo(todoId: ID!, userId: ID!): ToDoOrBE!
        unAssignUserFromToDo(todoId: ID!, userId: ID!): ToDoOrBE!
    }
`;