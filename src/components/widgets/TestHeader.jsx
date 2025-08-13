import Logo from "../../assets/Logo.svg";
import MiniLogo from "../../assets/miniLogo.svg";
import Timer from "./Timer";

const TestHeader = (props) => {
    return (
        <header className="header">
            <picture>
                <source media="(max-width: 768px)" srcSet={MiniLogo} />
                <source media="(min-width: 1024px)" srcSet={Logo} />
                <img src={Logo} alt="Логотип компании" />
            </picture>
            <div className="textForTestHeader">
                <div className="testName">{props.testName}</div>
                <div className="testDate">{props.testDate}</div>
            </div>
            <Timer
                timeStart={props.timeStart}
                timeEnd={props.timeEnd}
                className={"Timer"}
                classNameForTime={"timeInTimer"}
                classNameForText={"textForTime"}
            />
        </header>
    );
};

export default TestHeader;
