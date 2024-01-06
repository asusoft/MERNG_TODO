export const UserType = `
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
  }

  type AuthUser {
    user: User!
    token: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
    avatar: String
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;