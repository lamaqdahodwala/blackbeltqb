// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  mastery: 40,
  testable: true,
  learned: [
    {
      answer: 'Somalia',
    },
    {
      answer: 'Portugal',
    },
    {
      answer: 'USSR',
    },
  ],
})

export const noMasteryTest = (/* vars, { ctx, req } */) => ({
  mastery: 40,
  testable: false,
  learned: [],
})

export const noLearnedQuestions = (/* vars, { ctx, req } */) => ({
  mastery: 40,
  testable: true,
  learned: [],
})

