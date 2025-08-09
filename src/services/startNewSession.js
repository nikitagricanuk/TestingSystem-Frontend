import axios from "axios";

async function startTest(test_id = 1) {
    return await axios.post(`http://127.0.0.1:8000/test/${test_id}/start`);
}

export default startTest;
