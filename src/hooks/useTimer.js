// useTimer.js
import { useEffect, useState } from "react";

const useTimer = ({ startTime, endTime, onComplete = () => {} }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer;
        const isValidTime =
            startTime && endTime && !isNaN(startTime) && !isNaN(endTime);

        if (!isValidTime) {
            setRemainingTime(0);
            setMinutes(0);
            setSeconds(0);
            return;
        }

        if (startTime >= endTime) {
            setRemainingTime(0);
            setMinutes(0);
            setSeconds(0);
            onComplete();
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const timeRemaining = endTime - now;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                setRemainingTime(0);
                setMinutes(0);
                setSeconds(0);
                onComplete();
                return;
            }

            setRemainingTime(timeRemaining);
            setMinutes(Math.floor((timeRemaining / 1000 / 60) % 60));
            setSeconds(Math.floor((timeRemaining / 1000) % 60));
        };

        updateTimer();
        timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [startTime, endTime, onComplete]);

    return { minutes, seconds, remainingTime };
};

export default useTimer;
