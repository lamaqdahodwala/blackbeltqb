import type { Prisma, Question } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.QuestionCreateArgs | Prisma.UserCreateArgs, "question" | "user">({
  user: {
    one: {
      data: {
        id: 1,
        username: "string",
        skillLevel: 1,
        hashedPassword: "string",
        salt: "string",
        learned: {
          create: {
            question: "yadda yadda yadda",
            difficulty: 1,
            answer: "wow you got it",
            category: "string",
            setName: "string",
            id: 3
          }
        }
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
        id: 1
      },
    },
    two: {
      data: {
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 2,
        id: 2
      },
    },
  },
})

export type StandardScenario = ScenarioData<Question, 'question'>
