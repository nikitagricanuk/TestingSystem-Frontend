import { getQuestion } from "../../services/GetQuestion";
import Answer from "../ui/answer/Answer";
import "../../styles/style.css";
import Button from "../ui/button/Button";
import { getQuestions } from "../../services/GetQuestions";
import { useEffect, useState } from "react";

const Questions = ({ questionID, setSelectedAnswers }) => {
    const [question, setQuestion] = useState(null);
    const [questions, setQuestions] = useState(null);
    useEffect(() => {
        const loadData = async () => {
            const q = await getQuestion(questionID);
            setQuestion(q);
        };
        alert("Загрузка вопроса по айди");
        loadData();
    }, [questionID]);

    useEffect(() => {
        const loadData = async () => {
            const all = await getQuestions();
            setQuestions(all);
        };
        alert("Загрузка всех вопросов");
        loadData();
    }, []);

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

    if (question) {
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
                                key={`${question.index}-${index}`}
                                type={question.category}
                                name={question.index}
                                value={choice}
                                id={`${question.index}-${index}`}
                                className="answer"
                                classNameLabel="answerText"
                                onChange={handleAnswerChange}
                            >
                                {choice}
                            </Answer>
                        ))}
                    </form>
                    <hr style={{ marginTop: 54 }} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
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
    } else if (questionID > questions.length) {
        content = <div>айди больше чем вопросов</div>;
    } else if (questionID < questions.length) {
        content = <div>айди меньше чем вопросов</div>;
    } else {
        content = <div>Загрузка</div>;
    }

    return <div className="QuestionComponent">{content}</div>;
};

export default Questions;
