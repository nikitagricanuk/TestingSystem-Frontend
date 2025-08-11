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

const TestPage = () => {
    const initialQuestionNumber =
        parseInt(localStorage.getItem("questionNumber")) || 1;
    const [questionNumber, setQuestionNumber] = useState(initialQuestionNumber);
    const [question, setQuestion] = useState();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    let content;
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await startTest();
                setData(response.data);
            } catch (err) {
                if (err.code === "ECONNABORTED") {
                    console.error("Таймаут запроса");
                    setTimeout(true);
                } else {
                    console.error("Другая ошибка:", err.message);
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
                if (data !== null && questionNumber <= data?.total_questions) {
                    console.log(questionNumber, "из", data?.total_questions);
                    const q = await getQuestion(questionNumber);
                    setQuestion(q.data);
                } else {
                    throw new Error(
                        "Основные данные не были получены до запроса"
                    );
                }
            } catch (err) {
                console.error("Ошибка при загрузке вопроса:", err);
            }
        };

        loadQuestionByID();
    }, [questionNumber, data]);

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
                />
                <Questions
                    questionID={questionNumber}
                    setSelectedAnswers={setSelectedAnswers}
                    totalQuestions={data?.total_questions}
                    question={question}
                />
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
                        <NextQuestionButton
                            onClick={() => {
                                if (
                                    questionNumber < data?.total_questions ||
                                    0
                                ) {
                                    sendAnswer(
                                        questionNumber,
                                        1,
                                        selectedAnswers
                                    );
                                    setSelectedAnswers({});
                                }
                                if (
                                    questionNumber <= data?.total_questions ||
                                    0
                                ) {
                                    setQuestionNumber(questionNumber + 1);
                                }
                            }}
                        />
                    </div>

                    <div className="marginFinishButton">
                        <FinishButton />
                    </div>
                </div>
            </div>
        );
    } else if (timeout) {
        content = <div>TIMEOUT</div>;
    } else {
        content = <div className="loader"></div>;
    }

    return <div>{content}</div>;
};

export default TestPage;
