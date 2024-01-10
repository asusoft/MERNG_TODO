export const UserQuery = `
    type Query {
        getMe: User!
        getAllUsers: [User!]!
    }
`;