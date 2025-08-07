import Answer from "../ui/answer/Answer";
import "../../styles/style.css";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
const Questions = ({ questionID, setSelectedAnswers, questions, question }) => {
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
                return { ...prevAnswers, [name]: value };
            }
        });
    };

    let content;

    if (!questions) {
        content = <div>Загрузка вопросов...</div>;
    } else if (questionID < 1 || questionID > questions.length) {
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
                        {question.choices.map((choice, index) => (
                            <Answer
                                key={`${questionID}-${index}`}
                                type={question.category}
                                name={`question-${questionID}`}
                                value={choice}
                                id={`question-${questionID}-${index}`}
                                className="answer"
                                classNameLabel="answerText"
                                onChange={handleAnswerChange}
                            >
                                {choice}
                            </Answer>
                        ))}
                    </form>
                    <hr className="line" />
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button
                            className="errorButton"
                            onClick={() => alert("Вы сообщили об ошибке")}
                        >
                            Сообщить об ошибке
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const navigate = useNavigate();
    const goToResult = () => {
        if (!goToResult.hasRun) {
            goToResult.hasRun = true;
            alert("Переход к результатам");
            // navigate("/result");
        }
    };
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (questionID > questions.length && !hasRedirected.current) {
            hasRedirected.current = true;
            goToResult();
        }
    }, [questionID, questions.length]);

    return <div className="QuestionComponent">{content}</div>;
};

export default Questions;
