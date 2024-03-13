import './App.css';
import { Container } from 'react-bootstrap'
import { useState, useEffect, useCallback } from 'react';
import StartGame from './layouts/StartGame';
import InGame from './layouts/InGame';
import Timer from './components/Timer';
import EndGame from './layouts/EndGame';
import { initalTimeInSeconds } from './Constants';

function App() {
  const [remainingTime, setRemainingTime] = useState(initalTimeInSeconds);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [review, setReview] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = (await fetch('./questions.json'))
        const data = await response.json();
        setQuestions(data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [])

  const handleSubmit = useCallback(() => {
    let submit = true;
    if (remainingTime > 0) {
      submit = window.confirm("Do you want to submit answers ?");
    }
    if (submit) {
      questions.forEach((q, index) => {
        if (userAnswers[index]) {
          const correctAsnwer = q.answers.find((answer) => {
            return answer.correct === true;
          })
          if (correctAsnwer.answer_content === userAnswers[index]) setScore(prev => ++prev)
        }
      })
      setFinished(true);
    }
  }, [questions, userAnswers])

  useEffect(() => {
    let countdown;
    if (started) {
      countdown = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(prev => (prev - 1));
        }
      }, 1000)
    }
    if (remainingTime === 0) {
      clearInterval(countdown);
      handleSubmit();
    }
    return () => clearInterval(countdown)
  }, [started, remainingTime])


  const restart = () => {
    setStarted(false);
    setFinished(false);
    setReview(false);
    setUserAnswers([]);
    setScore(0);
    setRemainingTime(initalTimeInSeconds)
  }

  return (
    <Container fluid className='d-flex flex-column align-items-center text-center text-white py-5 '>
      {!started && !finished && <StartGame setStarted={setStarted} />}
      {started && !finished &&
        <>
          <Timer handleSubmit={handleSubmit} remainingTime={remainingTime} />
          <InGame questions={questions} setQuestions={setQuestions}
            setUserAnswers={setUserAnswers}
            finished={finished}
            setFinished={setFinished}
            handleSubmit={handleSubmit}
            review={review}
            userAnswers={userAnswers}
          />
        </>
      }
      {finished && !review && <EndGame score={score} restart={restart} setReview={setReview} />}
      {finished && review &&
        <>
          <Timer review={review} />
          <InGame questions={questions} userAnswers={userAnswers} review={review} restart={restart} />
        </>
      }
    </Container>
  );
}

export default App;
