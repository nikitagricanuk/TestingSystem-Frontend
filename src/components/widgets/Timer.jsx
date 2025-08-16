import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { submitTest } from "../../services/submitTest";
import useTimer from "../../hooks/useTimer";

const Timer = ({ timeStart, timeEnd }) => {
    const navigate = useNavigate();
    const hasRun = useRef(false);

    const handleTimerComplete = () => {
        if (hasRun.current) return;
        hasRun.current = true;
        alert("Время вышло!");
        submitTest();
        alert("Переход к результатам timer");
        // navigate("/result");
    };

    const { minutes, seconds } = useTimer({
        startTime: Date.parse(timeStart),
        endTime: Date.parse(timeEnd),
        onComplete: handleTimerComplete,
    });

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
