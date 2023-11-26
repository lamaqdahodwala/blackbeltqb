import type { FindTrainQuery, FindTrainQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useState } from 'react'

export const QUERY = gql`
  query FindTrainQuery {
    train: getNewQuestionForSkillLevel {
      id
      answer
      question
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTrainQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  train,
  queryResult: { refetch },
}: CellSuccessProps<FindTrainQuery, FindTrainQueryVariables>) => {
  let [questions, setQuestions] = useState([train])
  async function refetch_query() {
    let data = await refetch()
    setQuestions([...questions, data.data.train])
  }
  return (
    <div>
      <div>
        {questions.map((value, index) => (
          <div key={index}>
            <p> {value.question}</p>
            <p>{value.answer}</p>
          </div>
        ))}
      </div>
      <button onClick={() => refetch_query()}>New Question</button>
    </div>
  )
}
