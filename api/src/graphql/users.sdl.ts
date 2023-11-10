export const schema = gql`
  type User {
    id: Int!
    username: String!
    skillLevel: Int!
    mastered: [Question!]!
    learned: [Question!]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    skillLevel: Int!
  }

  input UpdateUserInput {
    username: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    skillLevel: Int
  }

`
