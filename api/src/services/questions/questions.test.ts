import type { Question } from '@prisma/client'

import {
  questions,
  question,
  getNewQuestionForSkillLevel,
} from './questions'
import type { StandardScenario } from './questions.scenarios'
import { createUser } from '../users/users'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('questions', () => {
  scenario('returns all questions', async (scenario: StandardScenario) => {
    const result = await questions()

    expect(result.length).toEqual(Object.keys(scenario.question).length)
  })

  scenario('returns a single question', async (scenario: StandardScenario) => {
    const result = await question({ id: scenario.question.one.id })

    expect(result).toEqual(scenario.question.one)
  })

  scenario("get a random question", async(scenario: StandardScenario) => {
    mockCurrentUser({ id: 1, skillLevel: 1})

    let random_question = await getNewQuestionForSkillLevel()

    expect([scenario.question.one, scenario.question.two]).toContainEqual(random_question)


  })


})
