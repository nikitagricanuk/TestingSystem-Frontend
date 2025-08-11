import axios from "./axiosConfig";

export const getQuestions = async (session_id) => {
    return await axios.get(`/tests/session/${session_id}/question/list`);
};
