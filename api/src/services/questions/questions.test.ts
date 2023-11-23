import type { Question } from '@prisma/client'

import { questions, question, getNewQuestionForSkillLevel } from './questions'
import type { StandardScenario } from './questions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

const TOTAL_NUMBER_OF_QUESTIONS = 3
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
