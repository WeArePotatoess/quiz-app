import PropTypes from "prop-types";

function StartGame({ setStarted }) {
    const handleStart = () => {
        setStarted(prev => !prev);
    }

    return (
        <><p className='welcome'>Welcome to React Quiz Game!</p>
            <button className='green-btn shadow-sm'
                onClick={handleStart}
            >Start</button></>
    )
}
StartGame.propTypes = {
    setStarted: PropTypes.func.isRequired,
}


export default StartGame;
