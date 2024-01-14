export const UserMutations = `
    type Mutation {
        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!
        updateUser(name: String, avatar: String): User!
    }
`;