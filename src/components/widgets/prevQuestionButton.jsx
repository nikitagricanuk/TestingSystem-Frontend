import Button from "../ui/button/Button.jsx";
import "../../styles/style.css";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

const PrevQuestionButton = (props) => {
    return (
        <Button className="prevQuestionButton" {...props}>
            <Arrow width="100px" height="100px" />
        </Button>
    );
};

export default PrevQuestionButton;
