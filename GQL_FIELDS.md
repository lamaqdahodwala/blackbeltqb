
A list of required Graphql resolvers and a description of their input and output


getUserLearned(): [Question]
returns the learned questions for the signed in account


getAveragePPG(): Number
returns the average points per game scored in the comp simulator


getPercentMastered(category: String): Number
returns the percentage of questionst hat the signed in user has mastered in a certain category


getPPGPercentile(): Number
returns the percentile that the current signed in user is relating to their average points per game, compared to other users in the same difficulty level



TRAINING:


DONE getRandomQuestionOnSkillLevel(): Question
returns a random question that the user has not seen before

DONE addQuestionToLearned(id: number): [Question]
adds a question with a specified id to the user's learned list, returning the new list


Testing:


canUserTest(): Boolean
returns whether or not the user can test for mastery (based on the length of the learned list)

createTestQuestions(): [Question]
returns a list of questions that would be used for a mastery test. This list of questions is based on questions that the user learned, which relate back to the original questions by either the same answer, or one of the details from the learned questions is the answer

testSubmit(record: Record): [ Changes ]
submit a mastery test, where the user's correctness is specified in the record. Returns an array of Changes, showing which questions, if any, were moved to the mastered class


