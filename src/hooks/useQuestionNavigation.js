import { sendAnswer } from "../services/sendAnswer.js";
import { toast } from "react-toastify";

export const useQuestionNavigation = ({
    sid,
    data,
    questionNumber,
    setQuestionNumber,
    selectedAnswers,
    setSelectedAnswers,
}) => {
    const handleNextQuestion = async () => {
        try {
            await sendAnswer(questionNumber, 1, selectedAnswers);
            setSelectedAnswers({});
            const canIncrement =
                data?.indefinite_questions ||
                questionNumber < data?.total_questions;
            if (canIncrement) setQuestionNumber(questionNumber + 1);
        } catch (err) {
            if (err.response?.status === 429)
                toast.error("Минимальное время для ответа - 5 секунд");
            else console.error(err);
        }
    };
    return { handleNextQuestion };
};
