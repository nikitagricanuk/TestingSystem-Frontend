import Dots from "./dots";

const ProgressBar = ({ QuestionsLenght, questionNumber, infinityQuestion }) => {
    const size = QuestionsLenght;
    const currQuestion = questionNumber;

    return (
        <div>
            <div
                style={{
                    height: "11px",
                    backgroundColor: "#8CC4FF",
                    borderRadius: "8px",
                    alignContent: "center",
                }}
            >
                <Dots size={size} />
            </div>
            <div
                style={{
                    marginTop: "-11px",
                    width: "115px",
                    height: "11px",
                    backgroundColor: "#4C9DF4",
                    borderRadius: "8px",
                    alignContent: "center",
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
