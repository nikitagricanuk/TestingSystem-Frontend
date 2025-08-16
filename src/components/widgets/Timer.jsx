const Timer = ({ minutes, seconds }) => {
    const format = (num) => String(num).padStart(2, "0");

    return (
        <div className="Timer">
            <div className="timeInTimer">
                {format(minutes)}:{format(seconds)}
            </div>
            <div className="textForTime">Оставшееся время</div>
        </div>
    );
};

export default Timer;
