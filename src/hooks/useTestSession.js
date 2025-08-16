import { useState, useEffect } from "react";
import startTest from "../services/startNewSession.js";
import { getSessionInfo } from "../services/getSessionInfo.js";
import { getQuestion } from "../services/getQuestion.js";

export const useTestSession = (initialQuestionNumber = 1) => {
    const [sid, setSid] = useState(null);
    const [data, setData] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(initialQuestionNumber);
    const [question, setQuestion] = useState();
    const [noQuestion, setNoQuestion] = useState(false);
    const [timeout, setTimeoutFlag] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let sidFromStorage = localStorage.getItem("Sid");
                if (!sidFromStorage) {
                    const { data } = await startTest(1);
                    sidFromStorage = data.sid;
                    localStorage.setItem("Sid", sidFromStorage);
                    setSid(sidFromStorage);
                    setData(data);
                    return;
                }
                setSid(sidFromStorage);
                const { data } = await getSessionInfo(sidFromStorage);
                setData(data);
            } catch (err) {
                if (err.code === "ECONNABORTED") {
                    setTimeoutFlag(true);
                } else {
                    console.error("Ошибка:", err.message);
                }
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const loadQuestionByID = async () => {
            try {
                if (
                    data &&
                    (data.indefinite_questions ||
                        questionNumber <= data.total_questions)
                ) {
                    const q = await getQuestion(questionNumber, sid);
                    setQuestion(q.data);
                }
            } catch (err) {
                if (err.response?.status === 404) setNoQuestion(true);
                else console.error(err);
            }
        };
        if (sid) loadQuestionByID();
    }, [questionNumber, data, sid]);

    useEffect(() => {
        localStorage.setItem("questionNumber", questionNumber.toString());
    }, [questionNumber]);

    return {
        question,
        questionNumber,
        setQuestionNumber,
        data,
        noQuestion,
        timeout,
        sid,
    };
};
export default useTestSession;
