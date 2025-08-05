import Button from "../ui/button/Button.jsx";
import "../../styles/style.css";

const FinishButton = (props) => {
    return (
        <Button className="finishButton" {...props}>
            Закончить
        </Button>
    );
};

export default FinishButton;
