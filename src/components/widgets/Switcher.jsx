import ArrowLeft from "../../assets/arrowLeft.svg";
import ArrowRight from "../../assets/arrowRight.svg";

const Switcher = ({
    value,
    onPrev,
    onNext,
    disablePrev = false,
    disableNext = false,
    style = {},
}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
                backgroundColor: "#F3F3F3",
                borderRadius: "10px",
                height: "36px",
                padding: "0 6px",
                ...style,
            }}
        >
            <button
                onClick={onPrev}
                disabled={disablePrev}
                style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px",
                    cursor: disablePrev ? "default" : "pointer",
                    opacity: disablePrev ? 0.3 : 1,
                }}
            >
                <img src={ArrowLeft} alt="Previous" width="16" height="16" />
            </button>

            <div
                style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#767676",
                    whiteSpace: "nowrap",
                }}
            >
                {value}
            </div>

            <button
                onClick={onNext}
                disabled={disableNext}
                style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px",
                    cursor: disableNext ? "default" : "pointer",
                    opacity: disableNext ? 0.3 : 1,
                }}
            >
                <img src={ArrowRight} alt="Next" width="16" height="16" />
            </button>
        </div>
    );
};

export default Switcher;
