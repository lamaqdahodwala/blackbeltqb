import { Link, routes } from '@redwoodjs/router'
import TrainCell from 'src/components/TrainCell/TrainCell'
import { MetaTags } from '@redwoodjs/web'

const TrainPage = () => {
  return (
    <>
      <MetaTags title="Train" description="Train page" />

      <TrainCell></TrainCell>
    </>
  )
}

export default TrainPage
