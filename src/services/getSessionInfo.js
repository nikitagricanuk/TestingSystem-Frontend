import axios from "./axiosConfig";

export const getSessionInfo = async (session_id) => {
    return await axios.get(`/tests/session/${session_id}`);
};
