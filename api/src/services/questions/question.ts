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

export const getUserLearned: QueryResolvers['getUserLearned'] = () => {
  return db.user
    .findUnique({
      where: {
        id: context.currentUser.id,
      },
      include: {
        learned: true,
      },
    })
    .learned()
}

export const getPercentMastery: QueryResolvers['getPercentMastery'] = async ({ difficulty }) => {
  let user_skill = await db.user.findUnique({
    where: {
      id: context.currentUser.id,
    },
  })

  let skill = difficulty ? difficulty : user_skill.skillLevel

  let user = await db.user.findUnique({
    where: {
      id: context.currentUser.id
    },
    include: {
      _count: {
        select: {
          mastered: {
            where: {
              difficulty: skill
            }
          }
        }
      }
    }
  })

  let total_number = await db.question.count({
    where: {
      difficulty: skill
    },
  })

  let percentage_rounded = ( ( user._count.mastered / total_number ) * 100 ).toFixed(1)
  return Number(percentage_rounded)
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
        mastered: true
      },
    })

    let user_learned_questions_ids = user.learned.map((val) => val.id)
    let user_mastered_question_ids = user.mastered.map((val) => val.id)

    let question = await db.question.findMany({
      where: {
        difficulty: user.skillLevel,
        id: {
          notIn: [...user_learned_questions_ids, ...user_mastered_question_ids],
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
            id: id,
          },
        },
      },
      include: {
        learned: true,
      },
    })
    return new_user.learned
  }

export const canUserTest: QueryResolvers['canUserTest'] = async () => {
  let user_id = context.currentUser.id
  let user = await db.user.findUnique({
    where: {
      id: user_id,
    },
    select: {
      _count: {
        select: {
          learned: true,
        },
      },
    },
  })

  return user._count.learned === 5 ? true : false
}

export const getTestingQuestions: QueryResolvers['getTestingQuestions'] =
  async () => {
    let user_id = context.currentUser.id
    let user = await db.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        learned: {
          select: {
            id: true,
            answer: true,
          },
        },
      },
    })
    let test = []
    for (let index = 0; index < user.learned.length; index++) {
      const answer = user.learned[index].answer

      let possible_questions = await db.question.findMany({
        where: {
          AND: [
            {
              answer: {
                contains: answer,
              },
            },
            {
              id: {
                notIn: user.learned.map((val) => val.id),
              },
            },
          ],
        },
      })

      let random_index = Math.floor(Math.random() * possible_questions.length)

      let random_question = possible_questions[random_index]

      test.push(random_question)
    }

    return test
  }

export const testSubmit: MutationResolvers['testSubmit'] = async ({
  record,
}) => {
  let user_id = context.currentUser.id
  let user = await db.user.findUnique({
    where: {
      id: user_id,
    },
    include: {
      learned: true,
    },
  })

  let changes = []
  for (let index = 0; index < record.length; index++) {
    const question_turned_in = record[index]

    if (question_turned_in.gotCorrect) {
      changes.push({
        question_id: question_turned_in.question_id,
        movedTo: 'mastered',
      })
      await db.user.update({
        where: {
          id: user_id,
        },
        data: {
          learned: {
            disconnect: {
              id: question_turned_in.question_id,
            },
          },
          mastered: {
            connect: {
              id: question_turned_in.question_id,
            },
          },
        },
      })
    }
  }
  return changes
}

export const Question: QuestionRelationResolvers = {
  masters: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).masters()
  },
  learners: (_obj, { root }) => {
    return db.question.findUnique({ where: { id: root?.id } }).learners()
  },
}
