import React, { useEffect, useState } from 'react'
import Styles from './InGame.module.css'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

function InGame({ questions, setUserAnswers, restart, handleSubmit, review, userAnswers }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    useEffect(() => {
        setCurrentQuestion(questions[currentQuestionIndex]);
    }, [currentQuestionIndex, questions])


    const handlePrev = () => {
        setCurrentQuestionIndex(prev => --prev)
    }

    const handleNext = () => {
        setCurrentQuestionIndex(prev => ++prev)
    }

    const handleSelect = (selectedAnswer) => {
        setUserAnswers((prev) => {
            const temp = [...prev];
            temp[currentQuestionIndex] = selectedAnswer.answer_content;
            return temp;
        });
    }

    return (
        <div className='w-75 d-flex flex-column align-items-center'>
            <div className={Styles.controlBtns + " mb-5 d-flex gap-3 justify-content-center"}   >
                <button className='gray-btn shadow' disabled={currentQuestionIndex === 0} onClick={handlePrev}>Previous</button>
                <button className='green-btn shadow' onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
                {currentQuestionIndex === questions.length - 1 &&
                    <Button variant='warning shadow text-white px-4' onClick={() => { if (review) restart(); else handleSubmit() }} className='fw-bold'>{review ? 'Restart' : "Submit"}</Button>}
            </div>
            <div className={Styles.questionContainer + " position-relative d-flex flex-column align-items-center"}>
                <div className={Styles.questionContent + ' bg-white text-dark p-5 rounded'}>
                    <p className={Styles.blueText}>Question <b>{currentQuestionIndex + 1}</b>/{questions.length} </p>
                    <span>{currentQuestion?.question_content}</span></div>
                <div className='list-group'>
                    {currentQuestion?.answers.map((q, index) => (
                        <button
                            key={q.answer_content}
                            className={`bg-white text-dark list-group-item rounded shadow-sm mt-5 text-start fs-4 ${Styles.choice} ${userAnswers[currentQuestionIndex] === q.answer_content && review ? Styles.userSelect : ""}${userAnswers[currentQuestionIndex] === q.answer_content && !review ? Styles.selected : ""} ${q.correct && review ? Styles.correctAnswer : ''}`}
                            onClick={() => { if (!review) handleSelect(q) }}
                            disabled={review}
                        >
                            {index + 1 + ') ' + q.answer_content}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}


InGame.propTypes = {
    questions: PropTypes.any.isRequired,
    userAnswers: PropTypes.array.isRequired,
    setUserAnswers: PropTypes.func,
    restart: PropTypes.func,
    handleSubmit: PropTypes.func,
    review: PropTypes.bool.isRequired,
}

export default InGame;