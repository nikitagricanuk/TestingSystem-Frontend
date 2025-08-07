import { useEffect, useState } from "react";
import useTimer from "../../hooks/useTimer";

const Timer = () => {
    const [serverTimes, setServerTimes] = useState({
        startTime: null,
        endTime: null,
    });

    useEffect(() => {
        const savedStart = localStorage.getItem("serverStartTime");
        const savedEnd = localStorage.getItem("serverEndTime");

        if (savedStart && savedEnd) {
            setServerTimes({
                startTime: parseInt(savedStart),
                endTime: parseInt(savedEnd),
            });
        } else {
            const fakeApiResponse = {
                startTime: Date.now(),
                endTime: Date.now() + 60 * 1000, // +1 минута
            };

            localStorage.setItem(
                "serverStartTime",
                fakeApiResponse.startTime.toString()
            );
            localStorage.setItem(
                "serverEndTime",
                fakeApiResponse.endTime.toString()
            );

            setServerTimes(fakeApiResponse);
        }
    }, []);

    const handleTimerComplete = () => {
        alert("Время вышло!");

        localStorage.removeItem("serverStartTime");
        localStorage.removeItem("serverEndTime");
    };

    const { minutes, seconds } = useTimer({
        startTime: serverTimes.startTime,
        endTime: serverTimes.endTime,
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
