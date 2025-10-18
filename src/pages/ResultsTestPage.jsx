import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTestContext } from "../utils/TestContext";
import TestResultsCard from "../components/widgets/TestResultsCard";
import TestHeader from "../components/widgets/TestHeader";

const ResultPage = () => {
    const { isTestCompleted } = useTestContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTestCompleted) {
            alert("Тест не завершен. Перенаправление на страницу теста.");
            navigate("/test");
        }
    }, [isTestCompleted, navigate]);

    return (
        <div>
            <TestHeader
                testName={"Ежемесячное тестирование по математике"}
                testDate={"Сентябрь 2025"}
                minutes={0}
                seconds={0}
            />
            <div style={{ marginTop: "17px" }}>
                <div className="progressbarProgress"></div>
            </div>

            <TestResultsCard />
        </div>
    );
};

export default ResultPage;
