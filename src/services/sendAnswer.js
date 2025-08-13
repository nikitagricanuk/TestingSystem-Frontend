import axios from "./axiosConfig";

export const sendAnswer = async (question_id, session_id = 1, answer) => {
    const value = answer ? answer[Object.keys(answer)] : "";

    const payload = { answer: [String(value)] };

    try {
        return await axios.post(
            `/tests/session/${session_id}/question/${question_id}/answer`,
            payload
        );
    } catch (err) {
        if (err.response) {
            if (err.response.status === 429) {
                console.error("Слишком много запросов. Пожалуйста, подождите.");
                throw err;
            } else {
                console.error(`Ошибка отправки ответа: ${err.response.status}`);
            }
        } else {
            console.error("Ошибка отправки ответа:", err);
        }
    }
};
