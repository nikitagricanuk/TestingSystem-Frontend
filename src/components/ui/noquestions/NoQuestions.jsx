import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { submitTest } from "../../../services/submitTest";

const NoQuestions = (props) => {
    const finishTest = () => {
        submitTest(props.sid);
        alert("Переход к результатам");
        // navigate("/result");};
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
//TODO переход к результатам
export default NoQuestions;
