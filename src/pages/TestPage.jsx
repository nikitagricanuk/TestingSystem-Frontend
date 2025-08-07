import { useEffect, useState } from "react";
import Questions from "../components/widgets/Question.jsx";
import TestHeader from "../components/widgets/TestHeader.jsx";
import NextQuestionButton from "../components/widgets/NextQuestionButton.jsx";
import PrevQuestionButton from "../components/widgets/prevQuestionButton.jsx";
import FinishButton from "../components/widgets/FinishButton.jsx";
import ProgressBar from "../components/widgets/ProgressBar.jsx";
const TestPage = (props) => {
    const initialQuestionNumber =
        parseInt(localStorage.getItem("questionNumber")) || 1;
    const [questionNumber, setQuestionNumber] = useState(initialQuestionNumber);

    useEffect(() => {
        localStorage.setItem("questionNumber", questionNumber.toString());
    }, [questionNumber]);

    const [selectedAnswers, setSelectedAnswers] = useState({});

    return (
        <div>
            <TestHeader
                testName={"Ежемесячное тестирование по математике"}
                testDate={"Сентябрь 2025"}
            />
            <ProgressBar QuestionsLenght={4} questionNumber={questionNumber} />
            <Questions
                questionID={questionNumber}
                setSelectedAnswers={setSelectedAnswers}
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
                <div style={{ marginLeft: "18px" }}>
                    <NextQuestionButton
                        onClick={() => {
                            console.log("Выбранный ответ:", selectedAnswers);
                            setSelectedAnswers({});
                            if (questionNumber < 4) {
                                // если 4 - количество вопросов
                                setQuestionNumber(questionNumber + 1);
                            }
                        }}
                    />
                </div>

                <div style={{ marginLeft: "365px" }}>
                    <FinishButton />
                </div>
            </div>
        </div>
    );
};

export default TestPage;
