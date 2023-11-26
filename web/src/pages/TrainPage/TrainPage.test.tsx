import { render } from '@redwoodjs/testing/web'

import TrainPage from './TrainPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TrainPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TrainPage />)
    }).not.toThrow()
  })
})
