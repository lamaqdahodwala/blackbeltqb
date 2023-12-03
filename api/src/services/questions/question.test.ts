import type { Question } from '@prisma/client'

import {
  questions,
  question,
  getNewQuestionForSkillLevel,
  addQuestionToLearned,
  canUserTest,
  getTestingQuestions,
  testSubmit,
  getPercentMastery,
} from './question'
import type { StandardScenario } from './question.scenarios'
import { db } from 'src/lib/db'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

const TOTAL_NUMBER_OF_QUESTIONS = 4
describe('questions', () => {
  scenario('returns all questions', async (scenario: StandardScenario) => {
    const result = await questions()

    expect(result.length).toEqual(TOTAL_NUMBER_OF_QUESTIONS)
  })

  scenario('returns a single question', async (scenario: StandardScenario) => {
    const result = await question({ id: scenario.question.one.id })

    expect(result).toEqual(scenario.question.one)
  })

  scenario(
    'get a question on skill level',
    async (scenario: StandardScenario) => {
      mockCurrentUser({ id: 1 })
      const result = await getNewQuestionForSkillLevel()

      expect(result).toEqual(scenario.question.one)
    }
  )

  scenario(
    "get a question on skill level and make sure it's not already learned",
    async (scenario: StandardScenario) => {
      mockCurrentUser({ id: 1, skillLevel: 1 })
      for (let index = 0; index < 100; index++) {
        const result = await getNewQuestionForSkillLevel()
        expect(result.id).not.toEqual(3)
      }
    }
  )
})

describe('addQuestionToLearned', () => {
  scenario("adds a question to learned that wasn't there before", async () => {
    mockCurrentUser({ id: 1 })
    let result = await addQuestionToLearned({ id: 1 })
    expect(result.length).toEqual(2)
  })
  scenario('does not add a question that already is learned', async () => {
    mockCurrentUser({ id: 1 })
    let result = await addQuestionToLearned({ id: 3 })
    expect(result.length).toEqual(1)
  })
})

describe('canUserTest', () => {
  scenario(
    'checks if you have enough learned questions to take a test',
    async (scenario: StandardScenario) => {
      mockCurrentUser({ id: 1 })
      let result = await canUserTest()
      expect(result).toBe(false)
    }
  )
})

describe('getTestingQuestions', () => {
  scenario(
    'gets a question that contains an answer from one of your learned',
    async (scenario: StandardScenario) => {
      mockCurrentUser({ id: 1 })
      let result = await getTestingQuestions()
      expect(result).toEqual([scenario.question.one])
    }
  )
})

describe('testSubmit', () => {
  scenario(
    'can move learned questions answered correctly into mastered',
    async (scenario) => {
      mockCurrentUser({ id: 1 })
      let result = await testSubmit({
        record: [
          {
            question_id: 3,
            gotCorrect: true,
          },
        ],
      })
      expect(result).toHaveLength(1)
      expect(result[0]).toHaveProperty('movedTo')

      let user = await db.user.findUnique({
        where: {
          id: 1,
        },
        include: {
          learned: true,
          mastered: true,
        },
      })

      expect(user.learned).toHaveLength(0)
      expect(user.mastered).toHaveLength(2)
    }
  )
  scenario('does not move questions answered incorrectly', async (scenario) => {
    mockCurrentUser({ id: 1 })
    let result = await testSubmit({
      record: [
        {
          question_id: 3,
          gotCorrect: false,
        },
        {
          question_id: 1,
          gotCorrect: true,
        },
      ],
    })

    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('question_id')
    expect(result[0]).toHaveProperty('movedTo')

    let user = await db.user.findUnique({
      where: {
        id: 1,
      },
      include: {
        learned: true,
        mastered: true,
      },
    })

    expect(user.learned).toHaveLength(1)
    expect(user.mastered).toHaveLength(2)
  })
})

describe("getPercentMastered", () => {
  scenario("calculates the proper ratio without a specified diff", async(scenario) => {
    mockCurrentUser({id: 1})
    let result = await getPercentMastery({})

    expect(result).toEqual(33.3)
  })

  // scenario('calculate the proper ratio of a specified diff')
})
