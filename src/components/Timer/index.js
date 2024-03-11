import Styles from './Timer.module.css'
import PropTypes from 'prop-types'


function Timer({ review, remainingTime }) {

    if (!review)
        return (
            <div className={`bg-white rounded-circle  ${Styles.timer} shadow text-dark fw-bold`}>
                0{Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}
            </div>
        )
    else return (
        <div className={`bg-white rounded-circle  ${Styles.timer} shadow text-danger fw-bold`}>
            End!
        </div>
    )
}

Timer.propTypes = {
    review: PropTypes.bool,
    remainingTime: PropTypes.number
}


export default Timer;
