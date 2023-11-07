// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'

// This script will load questions from the qbreader.org API and insert them into the database

interface IQuestion {
  _id: string
  question: string
  formatted_answer: string
  answer: string
  alternate_subcategory: string
  category: string
  subcategory: string
  setName: string
  setYear: number
  type: string
  packetNumber: number
  packetName: string
  questionNumber: number
  createdAt: string
  updatedAt: string
  difficulty: number
}
export default async ({ args }) => {
  for (let i = 1; i <= 10; i++) {
    console.log(`Starting creation for questions at difficulty ${i}`)
    await fetchQuestionsAndCreateInDB(i)
    await waitOneSecond()
  }
}

const fetchQuestionsAndCreateInDB = async (difficulty: number) => {
  // Your script here...
  // console.log(':: Executing script with args ::')
  // console.log(args)
  //

  let data = await fetch(
    `https://qbreader.org/api/query?questionType=tossup&maxReturnLength=10000&difficulties=${difficulty}`
  )

  let json = await data.json()

  let questions: Array<IQuestion> = json.tossups.questionArray

  for (let index = 0; index < questions.length; index++) {
    const element = questions[index];

    await db.question.create({
      data: {
        question: element.question,
        answer: element.answer,
        difficulty: element.difficulty,
        category: element.category,
        setName: element.setName,
      }
    })


  }
  console.log(
    `Finished adding ${questions.length} questions in difficulty ${difficulty} `
  )
}
async function waitOneSecond() {
  await waitMilliseconds(1000)
}

async function waitMilliseconds(millis: number) {
  await new Promise((resolve) => setTimeout(resolve, millis))
}
