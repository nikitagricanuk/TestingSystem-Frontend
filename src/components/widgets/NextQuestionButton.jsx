import Button from "../ui/button/Button.jsx";
import "../../styles/style.css";

const NextQuestionButton = (props) => {
    return (
        <Button className="nextQuestionButton" {...props}>
            Далее
        </Button>
    );
};

export default NextQuestionButton;
