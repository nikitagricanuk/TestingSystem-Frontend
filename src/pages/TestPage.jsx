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

const TestPage = () => {
    // localStorage.clear();
    const initialQuestionNumber =
        parseInt(localStorage.getItem("questionNumber")) || 1;

    const [questionNumber, setQuestionNumber] = useState(initialQuestionNumber);

    const [question, setQuestion] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const [data, setData] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await startTest();
                setData(response.data);
            } catch (err) {
                console.log(err);
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
                // TODO добавь проверку чтоб не запрашивала сверх вопросов
                console.log(questionNumber, "из", data?.total_questions);
                const q = await getQuestion(questionNumber);
                setQuestion(q.data);
            } catch (err) {
                console.error("Ошибка при загрузке вопроса:", err);
            }
        };

        loadQuestionByID();
    }, [questionNumber]);

    return data != undefined && question != undefined ? (
        <div>
            <TestHeader
                testName={"Ежемесячное тестирование по математике"}
                testDate={"Сентябрь 2025"}
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
                            if (questionNumber < data?.total_questions || 0) {
                                sendAnswer(questionNumber, 1, selectedAnswers);
                                setSelectedAnswers({});
                            }
                            if (questionNumber <= data?.total_questions || 0) {
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
    ) : (
        // TODO сделать лоадер
        <div>Загрузка вопросов </div>
    );
};

export default TestPage;
