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
            <div
                style={{
                    height: "11px",
                    backgroundColor: "#8CC4FF",
                    borderRadius: "8px",
                    alignContent: "center",
                }}
            >
                <Dots size={size} onSpacingChange={handleSpacingChange} />
            </div>
            <div
                style={{
                    marginTop: "-11px",
                    width: `${progressWidth}px`,
                    height: "11px",
                    backgroundColor: "#4C9DF4",
                    borderRadius: "8px",
                    alignContent: "center",
                    pointerEvents: "none",
                    transition: "width 0.3s ease-in-out",
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
