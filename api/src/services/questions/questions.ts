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

    let user_learned_questions_ids = user.learned.map((val) => val.id)

    let question = await db.question.findMany({
      where: {
        difficulty: user.skillLevel,
        id: {
          notIn: user_learned_questions_ids,
        },
      },
    })

    let random_index = Math.floor(Math.random() * question.length)
    return question[random_index]
  }

export const addQuestionToLearned: MutationResolvers['addQuestionToLearned'] =
  async ({ id }) => {
    let user_id = context.currentUser.id
    let user = await db.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        learned: true,
      },
    })

    let user_learned_questions_ids = user.learned.map((val) => val.id)

    if (user_learned_questions_ids.includes(id)) return user.learned

    let new_user = await db.user.update({
      where: {
        id: id,
      },
      data: {
        learned: {
          connect: {
            id: id
          },
        },
      },
      include: {
        learned: true
      }
    })
    return new_user.learned
  }

  export const canUserTest: QueryResolvers['canUserTest'] = async () => {
    let user_id = context.currentUser.id
    let user = await db.user.findUnique({
      where: {
        id: user_id
      },
      select: {
        _count: {
          select: {
            learned: true
          }
        }
      }
    })

    return user._count.learned === 5 ? true : false
  }

export const Question: QuestionRelationResolvers = {
  masters: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).masters()
  },
  learners: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).learners()
  },
}
