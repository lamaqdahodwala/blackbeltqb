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
        learned: {
          create: {
            id: 3,
            question: "String",
            answer: "string",
            category: "String",
            setName: "String",
            difficulty: 1
          }
        }
      },
    }
  },
  question: {
    one:  {
      data: {
        id: 1,
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 1,
      }
    },
    two: {
      data: {
        id: 2,
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 1,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Question, 'question'>
