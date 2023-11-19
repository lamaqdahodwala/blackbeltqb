import type { Question } from '@prisma/client'

import {
  questions,
  question,
  getNewQuestionForSkillLevel,
  answeredQuestionRight,
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

    expect(result.length).toEqual(Object.keys(scenario.question).length + 1)
  })


  scenario("get a random question", async(scenario: StandardScenario) => {
    mockCurrentUser({ id: 1, skillLevel: 1})

    let random_question = await getNewQuestionForSkillLevel()

    expect([scenario.question.one, scenario.question.two]).toContainEqual(random_question)


  })

  scenario("mark a question as right: do nothing if already learned", async(scenario: StandardScenario) => {
    mockCurrentUser({id: 1, skillLevel: 1})

    let questions = await answeredQuestionRight({id: 3})

    expect(questions).toHaveLength(1)
  })

  scenario("mark a question as right: add if not in learned", async(scenario: StandardScenario) => {

    mockCurrentUser({id: 1, skillLevel: 1})
    let questions = await answeredQuestionRight({ id: 2 })

    expect(questions).toHaveLength(2)
  })


})
