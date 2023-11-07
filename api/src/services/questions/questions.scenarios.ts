import type { Prisma, Question } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.QuestionCreateArgs>({
  question: {
    one: {
      data: {
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 7992626,
      },
    },
    two: {
      data: {
        question: 'String',
        answer: 'String',
        category: 'String',
        setName: 'String',
        difficulty: 374017,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Question, 'question'>
