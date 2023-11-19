import type {
  QueryResolvers,
  MutationResolvers,
  QuestionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const questions: QueryResolvers['questions'] = () => {
  return db.question.findMany()
}

export const question: QueryResolvers['question'] = ({ id }) => {
  return db.question.findUnique({
    where: { id },
  })
}

export const getNewQuestionForSkillLevel: QueryResolvers['getNewQuestionForSkillLevel'] =
  async () => {
    let user_id = context.currentUser.id
    let user = await db.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        learned: true,
      },
    })

    let difficulty = user.skillLevel

    let all_questions = await db.question.findMany({
      where: {
        AND: {
          difficulty: difficulty,
          id: {
            notIn: user.learned.map((q) => q.id)
          }
        },
      },
    })

    let random_index = Math.floor(Math.random() * all_questions.length)

    let random_question = all_questions[random_index]

    return random_question
  }

export const answeredQuestionRight: QueryResolvers['answeredQuestionRight'] =
  async ({ id }) => {
    let user_id = context.currentUser.id

    let user = await db.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        learned: true,
        mastered: true,
      },
    })

    let question = await db.question.findUnique({
      where: {
        id: id,
      },
    })

    if (user.learned.includes(question)) {
      return user.learned
    }

    await db.user.update({
      where: {
        id: user_id,
      },
      data: {
        learned: {
          connect: {
            id: id,
          },
        },
      },
    })

    return db.user
      .findUnique({
        where: {
          id: user_id,
        },
        include: {
          learned: true,
        },
      })
      .learned()
  }

export const Question: QuestionRelationResolvers = {
  mastered: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).masters()
  },
  learned: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).learners()
  },
}
