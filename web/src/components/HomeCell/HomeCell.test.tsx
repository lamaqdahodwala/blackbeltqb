import { render } from '@redwoodjs/testing/web'
import { screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './HomeCell'
import { noLearnedQuestions, noMasteryTest, standard } from './HomeCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('HomeCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success {...standard()} />)
    }).not.toThrow()
  })

  it("renders the answers to the learned questions", async() => {
    render(<Success {...standard()}></Success>)
    expect(screen.getByText("Somalia")).toBeInTheDocument()
    })

  it("renders a message when there are no learned questions", async() => {
    render(<Success {...noLearnedQuestions()}></Success>)
    expect(screen.getByText("You have no learned questions yet")).toBeInTheDocument()
    expect(screen.queryByText("Somalia")).not.toBeInTheDocument()
  })

  it("does not show a button and shows a message instead if you don't have a test available", async() => {
    render(<Success {...noMasteryTest()}></Success>)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    expect(screen.queryByText("Learn 5 questions to take a mastery test")).toBeInTheDocument()
  })

  it("shows a test button if you have a test available", async() => {
    render(<Success {...standard()}></Success>)
    expect(screen.getByRole("button").innerHTML).toEqual("Take test")
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
