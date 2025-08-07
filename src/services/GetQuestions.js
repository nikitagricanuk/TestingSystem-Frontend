export const questions = [
    {
        index: 1,
        question: "Область сходимости ищется в том случае, если ряд",
        category: "radio",
        choices: [
            "верный ответ отсутствует",
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
    {
        index: 3,
        question: "Какие языки программирования вы используете?",
        category: "checkbox",
        choices: ["Python", "JavaScript", "C++", "Java", "Go"],
    },
    {
        index: 4,
        question: "Вы студент?",
        category: "radio",
        choices: ["Да", "Нет"],
    },
    {
        index: 5,
        question: "Вы говорите хорошо знаете иностранные языки?",
        category: "radio",
        choices: ["Да", "Нет"],
    },
];

export const getQuestions = async () => {
    return questions;
};
