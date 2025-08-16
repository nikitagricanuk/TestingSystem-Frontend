import { useEffect, useState } from "react";
import Questions from "../components/widgets/Question.jsx";
import TestHeader from "../components/widgets/TestHeader.jsx";
import NextQuestionButton from "../components/widgets/NextQuestionButton.jsx";
import PrevQuestionButton from "../components/widgets/prevQuestionButton.jsx";
import FinishButton from "../components/widgets/FinishButton.jsx";
import ProgressBar from "../components/widgets/ProgressBar.jsx";
import { getQuestion } from "../services/getQuestion.js";
import startTest from "../services/startNewSession.js";
import { sendAnswer } from "../services/sendAnswer.js";
import { useNavigate } from "react-router-dom";
import { getSessionInfo } from "../services/getSessionInfo.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/ui/loader/Loader.jsx";

const TestPage = () => {
    const initialQuestionNumber =
        parseInt(localStorage.getItem("questionNumber")) || 1;
    const [questionNumber, setQuestionNumber] = useState(initialQuestionNumber);
    const [question, setQuestion] = useState();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [sid, setSid] = useState(null);
    const [data, setData] = useState(null);
    const [timeout, setTimeoutFlag] = useState(false);
    const navigate = useNavigate();
    const [noQuestion, setNoQuestion] = useState(false); //закончились вопросы или нет
    const [infinityMode, setInfinityMode] = useState(false);
    let content;

    //localStorage.clear();

    const handleNextQuestion = async () => {
        try {
            await sendAnswer(questionNumber, 1, selectedAnswers);
            setSelectedAnswers({});
            const canIncrement =
                data?.indefinite_questions ||
                questionNumber <= data?.total_questions;
            if (canIncrement) {
                setQuestionNumber((prev) => prev + 1);
            }
        } catch (err) {
            if (err.response?.status === 429) {
                toast.error("Минимальное время для ответа - 5 секунд");
            } else {
                console.error("Ошибка при получении вопроса");
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                let sidFromStorage = localStorage.getItem("Sid");
                if (!sidFromStorage) {
                    const { data } = await startTest(1);
                    sidFromStorage = data.sid;
                    localStorage.setItem("Sid", sidFromStorage);
                    setSid(sidFromStorage);
                    setData(data);
                    return;
                }
                setSid(sidFromStorage);
                const { data } = await getSessionInfo(sidFromStorage);
                setData(data);
            } catch (err) {
                if (err.code === "ECONNABORTED") {
                    setTimeoutFlag(true);
                } else {
                    console.error("Ошибка:", err.message);
                }
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("questionNumber", questionNumber.toString());
    }, [questionNumber]);

    useEffect(() => {
        const loadQuestionByID = async () => {
            try {
                if (
                    data?.indefinite_questions ||
                    (data !== null && questionNumber <= data?.total_questions)
                ) {
                    const q = await getQuestion(questionNumber, sid);
                    setQuestion(q.data);
                } else {
                    throw new Error(
                        "Основные данные не были получены до запроса"
                    );
                }
            } catch (err) {
                if (err.response?.status == 404) {
                    setNoQuestion(true);
                } else {
                    console.error("Ошибка при загрузке вопроса:", err);
                }
            }
        };
        loadQuestionByID();
    }, [questionNumber, data]);

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

    if (data && question) {
        content = (
            <div>
                <TestHeader
                    testName={"Ежемесячное тестирование по математике"}
                    testDate={"Сентябрь 2025"}
                    timeStart={data?.time_start}
                    timeEnd={data?.time_finish}
                />
                <ProgressBar
                    QuestionsLenght={data?.total_questions || 0}
                    questionNumber={questionNumber}
                    infinityMode={infinityMode}
                />
                <Questions
                    questionID={questionNumber}
                    setSelectedAnswers={setSelectedAnswers}
                    totalQuestions={data?.total_questions}
                    question={question}
                    infinityMode={data?.indefinite_questions}
                />
                <ToastContainer />
                <div className="testFooter">
                    <div>
                        <PrevQuestionButton
                            onClick={() => {
                                if (questionNumber > 1) {
                                    setQuestionNumber(questionNumber - 1);
                                }
                            }}
                        />
                    </div>
                    <div className="marginNextPrevButton">
                        <NextQuestionButton onClick={handleNextQuestion} />
                    </div>
                    <div className="marginFinishButton">
                        <FinishButton />
                    </div>
                </div>
            </div>
        );
    } else if (timeout) {
        content = (
            <div
                style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{ justifyItems: "center" }}>
                    <h1>Ошибка 408</h1>
                    <h3>TIMEOUT</h3>
                </div>
            </div>
        );
    } else if (noQuestion) {
        content = <div>Вопросы закончились. Переход к результатам</div>;
        //TODO переход на страницу с результатами
    } else {
        content = <Loader />;
    }

    return <div>{content}</div>;
};

export default TestPage;
