import Button from "../ui/button/Button.jsx";
import Arrow from "../../assets/arrowForToResBut.svg";
const ToMyResultsButton = (props) => {
    return (
        <Button className="ToMyResultsButton" {...props}>
            <div>К результатам</div>
            <img srcSet={Arrow} alt="arrow" />
        </Button>
    );
};

export default ToMyResultsButton;
