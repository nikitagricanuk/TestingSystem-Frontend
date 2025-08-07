import { useEffect, useState } from "react";

const useTimer = ({ startTime, endTime, onComplete = () => {} }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer;
        let isTimerFinished = false;

        const updateTimer = () => {
            const now = Date.now();
            const remainingTime = endTime - now;

            if (remainingTime <= 0) {
                clearInterval(timer);
                setMinutes(0);
                setSeconds(0);

                if (!isTimerFinished) {
                    isTimerFinished = true;
                    onComplete();
                }
                return;
            }

            setMinutes(Math.floor((remainingTime / 1000 / 60) % 60));
            setSeconds(Math.floor((remainingTime / 1000) % 60));
        };

        if (startTime && endTime) {
            updateTimer();
            timer = setInterval(updateTimer, 1000);
        }

        return () => clearInterval(timer);
    }, [startTime, endTime, onComplete]);

    return { minutes, seconds };
};

export default useTimer;
