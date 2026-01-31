import CrossIcon from "../../assets/fi_rr_cross.svg";
import Button from "../ui/button/Button";

const CurrentTestWidget = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                maxWidth: "100%",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#000",
                    }}
                >
                    Тестирование по математике
                </h3>
                <Button
                    style={{
                        width: "120px",
                        padding: "8px 0",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#5A9BFF",
                        color: "#fff",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}
                >
                    Начать
                </Button>
            </div>

            <Button
                style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "#000",
                }}
                aria-label="Закрыть"
            >
                <img src={CrossIcon} alt="Закрыть" />
            </Button>
        </div>
    );
};

export default CurrentTestWidget;
