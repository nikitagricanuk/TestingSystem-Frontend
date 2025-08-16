import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useTimer from "../hooks/useTimer.js";
import { useTestSession } from "../hooks/useTestSession.js";
import { useQuestionNavigation } from "../hooks/useQuestionNavigation.js";

import { submitTest } from "../services/submitTest.js";

import TestHeader from "../components/widgets/TestHeader.jsx";
import ProgressBar from "../components/widgets/ProgressBar.jsx";
import Questions from "../components/widgets/Question.jsx";
import Loader from "../components/ui/loader/Loader.jsx";
import TimeoutError from "../components/ui/timeout/TimeoutError.jsx";
import NoQuestions from "../components/ui/noquestions/NoQuestions.jsx";
import TestFooter from "../components/widgets/TestFooter.jsx";

const TestPage = () => {
    const initialQuestionNumber =
        parseInt(localStorage.getItem("questionNumber")) || 1;
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const navigate = useNavigate();
    const [infinityMode, setInfinityMode] = useState(false);
    const hasRun = useRef(false);
    let content;

    //localStorage.clear();

    const {
        question,
        questionNumber,
        setQuestionNumber,
        data,
        noQuestion,
        timeout,
        sid,
    } = useTestSession(initialQuestionNumber);

    const { handleNextQuestion } = useQuestionNavigation({
        sid,
        data,
        questionNumber,
        setQuestionNumber,
        selectedAnswers,
        setSelectedAnswers,
    });

    useEffect(() => {
        if (
            questionNumber > data?.total_questions &&
            data?.indefinite_questions
        ) {
            setInfinityMode(true);
            toast.info("Переход в бесконечный режим");
        } else {
            setInfinityMode(false);
        }
    }, [questionNumber, data?.total_questions, data?.indefinite_questions]);

    const handleTimerComplete = useCallback(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        alert("Время вышло!");
        submitTest();
        alert("Переход к результатам timer");
        // navigate("/result");
    }, []);

    const { minutes, seconds, remainingTime } = useTimer({
        startTime: Date.parse(data?.time_start),
        endTime: Date.parse(data?.time_finish),
        onComplete: handleTimerComplete,
    });

    const totalDuration =
        Date.parse(data?.time_finish) - Date.parse(data?.time_start);
    const progressValue =
        totalDuration > 0 ? (totalDuration - remainingTime) / totalDuration : 0;

    if (timeout) {
        content = <TimeoutError />;
    } else if (noQuestion) {
        content = <NoQuestions />;
    } else if (!data || !question) {
        content = <Loader />;
    } else {
        content = (
            <div>
                <TestHeader
                    testName={"Ежемесячное тестирование по математике"}
                    testDate={"Сентябрь 2025"}
                    minutes={minutes}
                    seconds={seconds}
                />
                <ProgressBar
                    QuestionsLenght={data?.total_questions || 0}
                    questionNumber={questionNumber}
                    infinityMode={infinityMode}
                    progress={progressValue}
                />
                <Questions
                    questionID={questionNumber}
                    setSelectedAnswers={setSelectedAnswers}
                    totalQuestions={data?.total_questions}
                    question={question}
                    infinityMode={data?.indefinite_questions}
                />
                <ToastContainer />
                <TestFooter
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    handleNextQuestion={handleNextQuestion}
                />
            </div>
        );
    }

    return <div>{content}</div>;
};

export default TestPage;
