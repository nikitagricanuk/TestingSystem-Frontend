const questions = [
    {
        index: 1,
        question: "Область сходимости ищется в том случае, если ряд",
        category: "radio",
        choices: [
            "верный ответ отсутствует ",
            "тригонометрический",
            "знакопостоянный",
            "знакопеременный",
            "знакочередующийся",
        ],
    },
    {
        index: 2,
        question: "Какие языки вы знаете?",
        category: "checkbox",
        choices: ["Английский", "Испанский", "Немецкий"],
    },
];

export const getQuestion = (index) => {
    return questions.find((q) => q.index === index);
};
