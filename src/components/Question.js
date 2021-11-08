import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code, will be invoke after my dom is rendered
  useEffect(() => {
    //first check if the timer is at zero se we can reset it back to 10 and set onAnswered to false so our app either goes to the next question or returns nothing if all questions have been answered
    if (timeRemaining === 0) {
      setTimeRemaining(10)
      onAnswered(false)
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1)
  }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [timeRemaining])
  //Remember our dependancies have to be in brackets

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  // deconstructing the question to access its individual keys
  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
