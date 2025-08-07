import { useEffect, useState } from "react";
import Questions from "../components/widgets/Question.jsx";
import TestHeader from "../components/widgets/TestHeader.jsx";
import NextQuestionButton from "../components/widgets/NextQuestionButton.jsx";
import PrevQuestionButton from "../components/widgets/prevQuestionButton.jsx";
import FinishButton from "../components/widgets/FinishButton.jsx";
import ProgressBar from "../components/widgets/ProgressBar.jsx";
import { getQuestions } from "../services/GetQuestions.js";
import { getQuestion } from "../services/GetQuestion.js";

const TestPage = () => {
    const initialQuestionNumber =
        parseInt(localStorage.getItem("questionNumber")) || 1;
    const [questionNumber, setQuestionNumber] = useState(initialQuestionNumber);

    const [questions, setQuestions] = useState(() => {
        const stored = localStorage.getItem("questions");
        return stored ? JSON.parse(stored) : null;
    });

    const [question, setQuestion] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        localStorage.setItem("questionNumber", questionNumber.toString());
    }, [questionNumber]);

    useEffect(() => {
        const loadAllQuestions = async () => {
            try {
                const allQuestions = await getQuestions();
                setQuestions(allQuestions);
                localStorage.setItem("questions", JSON.stringify(allQuestions));
            } catch (err) {
                console.error("Ошибка при загрузке всех вопросов:", err);
            }
        };

        if (!questions || questions.length === 0) {
            loadAllQuestions();
        }
    }, [questions]);

    useEffect(() => {
        const loadSingleQuestion = async () => {
            try {
                if (questions && questions.length > 0) {
                    const q = questions.find((q) => q.id === questionNumber);
                    if (q) {
                        setQuestion(q);
                        return;
                    }
                }
                const q = await getQuestion(questionNumber);
                setQuestion(q);
            } catch (err) {
                console.error("Ошибка при загрузке вопроса:", err);
            }
        };

        loadSingleQuestion();
    }, [questionNumber, questions]);

    return (
        <div>
            <TestHeader
                testName={"Ежемесячное тестирование по математике"}
                testDate={"Сентябрь 2025"}
            />
            <ProgressBar
                QuestionsLenght={questions?.length || 0}
                questionNumber={questionNumber}
            />
            <Questions
                questionID={questionNumber}
                setSelectedAnswers={setSelectedAnswers}
                questions={questions}
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
                            console.log("Выбранный ответ:", selectedAnswers);
                            setSelectedAnswers({});
                            if (questionNumber <= questions?.length || 0) {
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
};

export default TestPage;
