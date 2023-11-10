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

export const getNewQuestionForSkillLevel: QueryResolvers['getNewQuestionForSkillLevel'] = async() => {
  let user_id = context.currentUser.id
  let user = await db.user.findUnique({
    where: {
      id: user_id
    }
  })

  let difficulty = user.skillLevel

  let all_questions = await db.question.findMany({
    where: {
      difficulty: difficulty
    }
  })

  let random_index = Math.floor(Math.random() * all_questions.length)

  let random_question = all_questions[random_index]

  return random_question
}

export const Question: QuestionRelationResolvers = {
  mastered: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).masters()},
  learned: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).learners()
  },
}
