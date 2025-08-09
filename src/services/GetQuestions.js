import axios from "axios";

export const getQuestions = async (session_id) => {
    return await axios.get(
        `http://127.0.0.1:8000/tests/session/${session_id}/question/list`
    );
};
