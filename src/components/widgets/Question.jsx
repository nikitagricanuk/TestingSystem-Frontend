import Answer from "../ui/answer/Answer";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { submitTest } from "../../services/submitTest";
const Questions = ({
    questionID,
    setSelectedAnswers,
    totalQuestions,
    question,
    infinityMode,
}) => {
    const handleAnswerChange = (event) => {
        const { name, value, type, checked } = event.target;

        setSelectedAnswers((prevAnswers) => {
            if (type === "checkbox") {
                const prev = prevAnswers[name] || [];
                if (checked) {
                    return { ...prevAnswers, [name]: [...prev, value] };
                } else {
                    return {
                        ...prevAnswers,
                        [name]: prev.filter((v) => v !== value),
                    };
                }
            } else {
                return { ...prevAnswers, [name]: [value] };
            }
        });
    };

    let content;
    if ((questionID < 1 || questionID > totalQuestions) && !infinityMode) {
        content = <div>Некорректный номер вопроса</div>;
    } else if (!question) {
        content = <div>Вопрос не найден</div>;
    } else {
        content = (
            <div>
                <div className="headQuestion">
                    Выберите правильный вариант ответа
                </div>
                <div className="Question">
                    <div className="questionText">{question.question}</div>
                    <form>
                        {question.choices.map((choice, question_id) => (
                            <Answer
                                key={`${questionID}-${question_id}`}
                                type={question.category}
                                name={`question-${questionID}`}
                                value={choice}
                                id={`question-${questionID}-${question_id}`}
                                className="answer"
                                classNameLabel="answerText"
                                onChange={handleAnswerChange}
                            >
                                {choice}
                            </Answer>
                        ))}
                    </form>
                    <hr className="line" />
                </div>
            </div>
        );
    }

    const navigate = useNavigate();
    const goToResult = () => {
        if (!goToResult.hasRun) {
            goToResult.hasRun = true;
            submitTest();
            alert("Переход к результатам");
            localStorage.clear();
            navigate("/result");
        }
    };
    const hasRedirected = useRef(false);
    useEffect(() => {
        if (
            questionID > totalQuestions &&
            !hasRedirected.current &&
            !infinityMode
        ) {
            hasRedirected.current = true;
            goToResult();
        }
    }, [questionID, totalQuestions]);

    return <div className="QuestionComponent">{content}</div>;
};

export default Questions;
