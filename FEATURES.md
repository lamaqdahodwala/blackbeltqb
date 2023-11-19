Features:

1. Have a simple room that reads out questions to you and expects answers within a time frame

- This room can do the following:
  - Read out questions from your difficulty level to you
  - Provide wikipedia articles for further reading
  - Allow you to find other wikipedia articles on other topics mentioned in the question
  - Track your correct-to-incorrect ratio or points (optional)
  - Provide a timer element to force you to think quickly
  - Can mark questions as "learned", which will determine when you should test yourself
  - Filter questions to only be in one category, allowing you to train in a single context and not split your attention
- This room should not:
  - Count against your mastery of any question. This is just to learn new things and review

2. Have a testing system to let you assess your knowledge over question that you have learned

- This feature can do the following:

  - Augment which questions you have learned
  - Set questions to be either mastered or learned
  - Only allow tests based on how many learned questions you have, and if you have enough learned questions
  - Use questions you haven't seen before in the training, but whose answer you already know from the training to prevent unengaged memorization
  - Also use questions based on details of the training questions (as in, a proper noun or PEDLIG), and set those details to the answer, making a question that still relates to the training data but is harder

- This room should not be:
  - Where you spend most of your time, which should be in Feature 1

3. Track your current skill level and find questions adapted to it

4. Have an optional testing feature to test your ability to questions from all over the difficulty range, like in a comp
  - ALso have some sort of CPU to play against that will force you to buzz early
  - Both your score and the CPU's score is tracked over the course of the game

Procedures:

- Marking a question as learned:
  - must be answered at least twice correctly, and cannot be answered the last sentence (for ten points)
  - The room will randomly pick either a new question, or an old question that you've already seen to read to you
    - As you get more questions in your session, it will be more weighted towards old questions
    - As you Learn a question, it will be more weighted towards new questions
    - Once the learned list is >= 5, a test will be available to take which will convert the learned questions to either nope or mastered
