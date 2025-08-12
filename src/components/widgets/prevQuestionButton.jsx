import Button from "../ui/button/Button.jsx";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

const PrevQuestionButton = (props) => {
    return (
        <Button className="prevQuestionButton" {...props}>
            <Arrow className="Arrow" />
        </Button>
    );
};

export default PrevQuestionButton;
