import { getQuestion } from "../../services/GetQuestion";
import Answer from "../ui/answer/Answer";
import "../../styles/style.css";
import Button from "../ui/button/Button";
// import { getQuestions } from "../../services/GetQuestions";
import { useEffect, useState } from "react";

const Questions = ({ questionID, setSelectedAnswers }) => {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const q = await getQuestion(questionID);

            setQuestion(q);
        };
        loadData();
    }, [questionID]);

    const handleAnswerChange = (event) => {
        const { name, value, type, checked } = event.target;

        setSelectedAnswers((prevAnswers) => {
            if (value == undefined) {
                alert("dddd");
            }
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

    return (
        <div className="QuestionComponent">
            {question && (
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
            )}
        </div>
    );
};

export default Questions;
