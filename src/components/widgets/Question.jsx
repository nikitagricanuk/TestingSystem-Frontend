import { getQuestion } from "../../services/GetQuestion";
import Answer from "../ui/answer/Answer";
import { useState } from "react";
import "../../styles/style.css";
import Button from "../ui/button/Button";
const Questions = ({ questionID }) => {
    const question = getQuestion(questionID);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    return (
        <div className="QuestionComponent">
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
                            >
                                {choice}
                            </Answer>
                        ))}
                    </form>
                    <hr style={{ marginTop: 54 }} />
                    <Button className="errorButton">Сообщить об ошибке</Button>
                </div>
            </div>
        </div>
    );
};

export default Questions;
