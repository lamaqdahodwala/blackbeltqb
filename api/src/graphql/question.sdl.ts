export const schema = gql`
  type Question {
    id: Int!
    question: String!
    answer: String!
    category: String!
    setName: String!
    difficulty: Int!
    masters: [User]!
    learners: [User]!
  }

  type Query {
    questions: [Question!]! @requireAuth
    question(id: Int!): Question @requireAuth
    getNewQuestionForSkillLevel: Question! @requireAuth
    addQuestionToLearned(id: Int!): [Question!]! @requireAuth
    canUserTest: Boolean! @requireAuth
    getTestingQuestions: [Question!]! @requireAuth
  }

  input Record {
    question_id: Int!
    gotCorrect: Boolean!
  }

  type TestChange {
    question_id: Int!
    moved_to: String
  }

  type Mutation {
    testSubmit(record: [Record!]!): [TestChange!]! @requireAuth
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
