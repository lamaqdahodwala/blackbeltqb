export const schema = gql`
  type Question {
    id: Int!
    question: String!
    answer: String!
    category: String!
    setName: String!
    difficulty: Int!
    masters: [User]!
  }

  type Query {
    questions: [Question!]! @requireAuth
    question(id: Int!): Question @requireAuth
  }

  input CreateQuestionInput {
    question: String!
    answer: String!
    category: String!
    setName: String!
    difficulty: Int!
  }

  input UpdateQuestionInput {
    question: String
    answer: String
    category: String
    setName: String
    difficulty: Int
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question! @requireAuth
    updateQuestion(id: Int!, input: UpdateQuestionInput!): Question!
      @requireAuth
    deleteQuestion(id: Int!): Question! @requireAuth
  }
`
