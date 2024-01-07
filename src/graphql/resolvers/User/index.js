export const UserCustomResolvers = {
    User: {
        id: ({ _id, id }) => _id || id
    }
};
