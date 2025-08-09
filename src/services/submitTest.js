import axios from "axios";

export const submitTest = async (session_id = 1) => {
    return await axios.post(
        `http://127.0.0.1:8000/tests/session/${session_id}/submit`
    );
};
