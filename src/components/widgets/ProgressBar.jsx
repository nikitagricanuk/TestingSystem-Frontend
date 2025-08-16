import Dots from "./dots";
import { useState } from "react";

const ProgressBar = ({
    QuestionsLenght,
    questionNumber,
    infinityMode,
    progress,
}) => {
    const size = QuestionsLenght;
    const currQuestion = questionNumber;
    const [spacing, setSpacing] = useState(0);
    const dotWidth = 5;
    const handleSpacingChange = (value) => {
        setSpacing(value);
    };
    let progressWidth;
    let content;

    if (!infinityMode) {
        progressWidth = currQuestion * spacing + currQuestion * dotWidth;
        content = (
            <div style={{ marginTop: "17px" }}>
                <div className="progressbarBackground">
                    <Dots size={size} onSpacingChange={handleSpacingChange} />
                </div>
                <div
                    style={{
                        width: `${progressWidth}px`,
                    }}
                    className="progressbarProgress"
                ></div>
            </div>
        );
    } else {
        progressWidth = progress * 100;
        content = (
            <div style={{ marginTop: "17px" }}>
                <div className="progressbarBackgroundInfinity"></div>
                <div
                    style={{
                        width: `${progressWidth}%`,
                    }}
                    className="progressbarProgressInfinity"
                ></div>
            </div>
        );
    }
    return content;
};

export default ProgressBar;
