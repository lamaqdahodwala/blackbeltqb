import type { Prisma, Question } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.QuestionCreateArgs | Prisma.UserCreateArgs, "question" | "user">({
  user: {
    one: {
      data: {
        username: "Username",
        skillLevel: 1,
        hashedPassword: "feiow",
        salt: "feiow3jg",
        id: 1,
      }
    }
  },
  question: {
    one: {
      data: {
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 1,
      },
    },
    two: {
      data: {
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 1,
      },
    },
    three: {
      data: {
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 2,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Question, 'question'>
