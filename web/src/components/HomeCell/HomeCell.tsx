import type { FindHomeQuery, FindHomeQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindHomeQuery($id: Int!) {
    home: home(id: $id) {
      id
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
  home,
}: CellSuccessProps<FindHomeQuery, FindHomeQueryVariables>) => {
  return <div>{JSON.stringify(home)}</div>
}
