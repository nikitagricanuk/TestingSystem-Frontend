import axios from "./axiosConfig";

export const getQuestion = async (question_id, session_id = 1) => {
    return await axios.get(
        `/tests/session/${session_id}/question/${question_id}`
    );
};
