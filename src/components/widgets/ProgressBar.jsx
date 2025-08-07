import Dots from "./dots";
import { useState } from "react";
const ProgressBar = ({ QuestionsLenght, questionNumber, infinityQuestion }) => {
    const size = QuestionsLenght;
    const currQuestion = questionNumber;

    const [spacing, setSpacing] = useState(0);
    const dotWidth = 5;

    const handleSpacingChange = (value) => {
        setSpacing(value);
    };

    const progressWidth = currQuestion * spacing + currQuestion * dotWidth;

    return (
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
};

export default ProgressBar;
