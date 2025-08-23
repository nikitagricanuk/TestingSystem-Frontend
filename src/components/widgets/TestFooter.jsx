import { useNavigate } from "react-router-dom";
import FinishButton from "./FinishButton";
import NextQuestionButton from "./NextQuestionButton";
import PrevQuestionButton from "./prevQuestionButton";
import { submitTest } from "../../services/submitTest";

const TestFooter = (props) => {
    const navigate = useNavigate();

    const finishTest = () => {
        submitTest(props.sid);
        alert("Переход к результатам");
        localStorage.clear();
        navigate("/result");
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
