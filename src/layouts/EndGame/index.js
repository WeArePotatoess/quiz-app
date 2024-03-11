import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap';


const EndGame = ({ score, restart, setReview }) => {

    const handleReview = () => {
        setReview(true);
    }
    return (<>
        <p className='fs-3'>
            Your score is: <strong>{score}</strong>
        </p>
        <div className='d-flex gap-2'>
            <Button variant='success' className='fw-bold' onClick={restart}>Try again</Button>
            <Button variant='danger' className='fw-bold' onClick={handleReview}>Review</Button>
        </div>
    </>);
}

EndGame.propTypes = {
    score: PropTypes.number.isRequired,
    setReview: PropTypes.func.isRequired,
    restart: PropTypes.func.isRequired
}


export default EndGame;