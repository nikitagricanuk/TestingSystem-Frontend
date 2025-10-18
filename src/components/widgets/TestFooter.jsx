import { useNavigate } from "react-router-dom";
import FinishButton from "./FinishButton";
import NextQuestionButton from "./NextQuestionButton";
import PrevQuestionButton from "./prevQuestionButton";
import { submitTest } from "../../services/submitTest";
import { useTestContext } from "../../utils/TestContext";

const TestFooter = (props) => {
    const navigate = useNavigate();
    const { setIsTestCompleted } = useTestContext();

    const finishTest = async () => {
        try {
            submitTest(props.sid);
            setIsTestCompleted(true);
            alert("Переход к результатам");
            localStorage.clear();
            navigate("/result");
        } catch (error) {
            console.error("Ошибка при завершении теста:", error);
            alert("Ошибка при отправке результатов. Попробуйте позже.");
        }
    };

    return (
        <div className="testFooter">
            <div>
                <PrevQuestionButton
                    onClick={() => {
                        if (props.questionNumber > 1) {
                            props.setQuestionNumber(props.questionNumber - 1);
                        }
                    }}
                />
            </div>

            <div className="marginNextPrevButton">
                <NextQuestionButton onClick={props.handleNextQuestion} />
            </div>

            <div className="marginFinishButton">
                <FinishButton onClick={finishTest} />
            </div>
        </div>
    );
};

export default TestFooter;
