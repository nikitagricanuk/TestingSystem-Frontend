import axios from "./axiosConfig";

export const submitTest = async (session_id = 1) => {
    return await axios.post(`/tests/session/${session_id}/submit`);
};
