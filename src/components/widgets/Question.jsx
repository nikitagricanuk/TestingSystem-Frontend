import Answer from "../ui/answer/Answer";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { submitTest } from "../../services/submitTest";
import { useTestContext } from "../../utils/TestContext";

const Questions = ({
    questionID,
    setSelectedAnswers,
    totalQuestions,
    question,
    infinityMode,
    sid,
}) => {
    const { setIsTestCompleted } = useTestContext();
    const navigate = useNavigate();

    const handleAnswerChange = (event) => {
        const { name, value, type, checked } = event.target;
        setSelectedAnswers((prevAnswers) => {
            if (type === "checkbox") {
                const prev = prevAnswers[name] || [];
                return checked
                    ? { ...prevAnswers, [name]: [...prev, value] }
                    : {
                          ...prevAnswers,
                          [name]: prev.filter((v) => v !== value),
                      };
            } else {
                return { ...prevAnswers, [name]: [value] };
            }
        });
    };

    const hasRedirected = useRef(false);

    useEffect(() => {
        if (
            questionID > totalQuestions &&
            !hasRedirected.current &&
            !infinityMode
        ) {
            hasRedirected.current = true;
            submitTest(sid);
            setIsTestCompleted(true);
            localStorage.clear();
            navigate("/result");
        }
    }, [questionID, totalQuestions, infinityMode, sid]);

    if ((questionID < 1 || questionID > totalQuestions) && !infinityMode) {
        return <div>Некорректный номер вопроса</div>;
    }
    if (!question) {
        return <div>Вопрос не найден</div>;
    }

    return (
        <div className="QuestionComponent">
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
};

export default Questions;
