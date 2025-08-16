import FinishButton from "./FinishButton";
import NextQuestionButton from "./NextQuestionButton";
import PrevQuestionButton from "./prevQuestionButton";

const TestFooter = (props) => {
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
                <FinishButton />
            </div>
        </div>
    );
};

export default TestFooter;
