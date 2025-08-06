import { questions } from "./GetQuestions";

export const getQuestion = async (index) => {
    return await questions.find((q) => q.index === index);
};
