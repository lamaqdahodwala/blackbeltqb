import type { FindHomeQuery, FindHomeQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindHomeQuery {
    mastery: getPercentMastery
    testable: canUserTest
    learned: getUserLearned {
      answer
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindHomeQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  mastery, testable, learned,
}: CellSuccessProps<FindHomeQuery, FindHomeQueryVariables>) => {
  return (
  <div>
    <p>Testable: {String(testable)}</p>
    <p>Learned questions: {JSON.stringify(learned)}</p>
    <p>Mastery percentage {String(mastery)}</p>
  </div>
  )
}
