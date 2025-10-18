import axios from "./axiosConfig";

export const getTestResults = async (test_id) => {
    return await axios.get(`/tests/result/${test_id}`);
};
