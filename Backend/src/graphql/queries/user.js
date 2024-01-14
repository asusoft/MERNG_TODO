export const UserQuery = `
    type Query {
        getMe: UserOrBE!
        getAllUsers: [User!]!
    }
`;