import axios from "./axiosConfig";

async function startTest(test_id = 1) {
    return await axios.post(`/test/${test_id}/start`);
}

export default startTest;
