import { useEffect, useState } from "react";

const useTimer = () => {
    //localStorage.clear();
    const initialMinutes = parseInt(localStorage.getItem("timerMinutes")) || 0;
    const initialSeconds = parseInt(localStorage.getItem("timerSeconds")) || 10;

    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        localStorage.setItem("timerMinutes", minutes.toString());
        localStorage.setItem("timerSeconds", seconds.toString());
    }, [minutes, seconds]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        alert("Время вышло");
                        return 0;
                    } else {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        return 59;
                    }
                } else {
                    return prevSeconds - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes]);

    return { minutes, seconds };
};

export default useTimer;
