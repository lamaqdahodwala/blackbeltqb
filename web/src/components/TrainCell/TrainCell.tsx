import type { FindTrainQuery, FindTrainQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTrainQuery($id: Int!) {
    train: train(id: $id) {
      id
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
}: CellSuccessProps<FindTrainQuery, FindTrainQueryVariables>) => {
  return <div>{JSON.stringify(train)}</div>
}
