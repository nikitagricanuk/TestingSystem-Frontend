import axios from "axios";

export const getQuestion = async (question_id, session_id = 1) => {
    return await axios.get(
        `http://127.0.0.1:8000/tests/session/${session_id}/question/${question_id}`
    );
};
