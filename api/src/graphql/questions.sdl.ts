export const schema = gql`
  type Question {
    id: Int!
    question: String!
    answer: String!
    category: String!
    setName: String!
    difficulty: Int!
  }

  type Query {
    questions: [Question!]! @requireAuth
    question(id: Int!): Question @requireAuth
    getNewQuestionForSkillLevel: Question! @requireAuth
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
`
