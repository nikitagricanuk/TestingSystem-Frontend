import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTestContext } from "../utils/TestContext";
import TestResultsCard from "../components/widgets/TestResultsCard";

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
            <TestResultsCard />
        </div>
    );
};

export default ResultPage;
