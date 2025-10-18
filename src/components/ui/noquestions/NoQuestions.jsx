import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { submitTest } from "../../../services/submitTest";
import { useTestContext } from "../../../utils/TestContext";

const NoQuestions = (props) => {
    const navigate = useNavigate();
    const { setIsTestCompleted } = useTestContext();

    const finishTest = () => {
        submitTest(props.sid);
        setIsTestCompleted(true);
        alert("Переход к результатам");
        localStorage.clear();
        navigate("/result");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            finishTest();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
            }}
        >
            <h2>Вопросы закончились. Переход к результатам...</h2>
        </div>
    );
};

export default NoQuestions;
