import { ReactComponent as Logo } from "../../assets/Logo.svg";
import Timer from "./Timer";
import "../../styles/style.css";

const TestHeader = (props) => {
    return (
        <header className="header">
            <Logo />
            <div className="textForTestHeader">
                <div className="testName">{props.testName}</div>
                <div className="testDate">{props.testDate}</div>
            </div>
            <Timer
                className={"Timer"}
                classNameForTime={"timeInTimer"}
                classNameForText={"textForTime"}
            />
        </header>
    );
};

export default TestHeader;
