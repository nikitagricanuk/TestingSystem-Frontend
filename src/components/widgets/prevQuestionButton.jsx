import Button from "../ui/button/Button.jsx";
import Arrow from "../../assets/arrow.svg";

const PrevQuestionButton = (props) => {
    return (
        <Button className="prevQuestionButton" {...props}>
            <img src={Arrow} alt="" />
        </Button>
    );
};

export default PrevQuestionButton;
