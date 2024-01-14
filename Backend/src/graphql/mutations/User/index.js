export const UserMutations = `
    type Mutation {
        signUp(input: SignUpInput): AuthUserOrBE!
        signIn(input: SignInInput): AuthUserOrBE!
        updateUser(name: String, avatar: String): User!
    }
`;