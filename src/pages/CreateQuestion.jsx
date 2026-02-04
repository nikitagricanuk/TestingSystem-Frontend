import React from 'react'
import SearchField from '../components/UI/Search/SearchField'
import { useState } from 'react'
import QuestionField from '../components/QuestionField'
import CounterQuestions from '../components/CounterQuestions'
import SelectColumn from '../components/UI/Select/SelectColumn'
import AnswersList from '../components/AnswersList'
import MyButton from '../components/UI/Button/MyButton'
import { useNavigate } from 'react-router-dom'

function CreateQuestion() {
    const [nameOfQuestion, setNameOfQuestion] = useState('') // название вопроса
    const [nameOfCategory, setNmaeOfCategory] = useState('') // название категории
    const [field, setfield] = useState('') // формулировка вопроса
    const [countAnswer, setCountAnswer] = useState(2) // количество ответов 
    const [answers, setAnswers] = useState([ //массив ответов
        {answerText: '', isCorrect: true},
        {answerText: '', isCorrect: false}
    ]) 
    const [choiceQuestion, setChoiceQuestion] = useState('multi') // количество правильных ответов

    const answersChange = (index, value) => { // функция обновления массива ответов
        const copyAnswers = [...answers]
        copyAnswers[index].answerText = value
        setAnswers(copyAnswers)
    }

    const answersCorrectChange = (index, isCorrect) => { // функция обновления массива ответов (правильность)
        const copyAnswers = [...answers]
        copyAnswers[index].isCorrect = isCorrect
        setAnswers(copyAnswers)
    }

    const choices = [ // типы количества правильных ответов
        {value: "multi", name: "Мульти-выбор"},
        {value: "one", name: "Один выбор"}
    ]

    const navigate = useNavigate() // хук для навигации

    const saveQuestions = () => { // функция создания вопроса
        const newQuestion = {
            id: Date.now(),
            name: nameOfQuestion,
            category: nameOfCategory,
            count: 0,
            region: "Иркутск",
            avr: 0,
            date:new Date().toLocaleDateString('ru-RU')
        }    

        navigate('/bank')
    }



    return (
        <>
            <h1>Новый вопрос</h1>
            <h2>Основные сведения</h2>

            <div style={{display: 'flex'}}>

                <p style={{width: '521px'}}>Название вопроса</p>
                <p style={{width: '521px', marginLeft: 'auto'}}>Категория</p>

            </div>

            <div style={{display: 'flex'}}>
                <SearchField value={nameOfQuestion} onChange={e => setNameOfQuestion(e.target.value)} style={{marginBottom:'5px'}}></SearchField>
                <div style={{width: '521px', marginLeft: 'auto'}}>
                    <SearchField value={nameOfCategory} onChange={e => setNmaeOfCategory(e.target.value)} style={{marginBottom:'5px'}}></SearchField>
                </div>
            </div>

            <QuestionField field={field} setfield={setfield}/>
            
            <h2>Настройка ответов</h2> 

            <div style={{display: 'flex'}}>

                <p style={{width: '521px'}}><b>Количество вариантов ответа</b></p>
                <p style={{width: '521px', marginLeft: 'auto'}}><b>Тип ответа</b></p>

            </div>
            
            <div style={{display: 'flex'}}>

                <CounterQuestions setAnswers={setAnswers} countAnswer={countAnswer} setCountAnswer={setCountAnswer}/>
                <div style={{display: 'flex', width: '521px', marginLeft: 'auto'}}>
                    <SelectColumn value={choiceQuestion} onChange={setChoiceQuestion} options={choices}/>
                </div>

            </div>
            
            <h2>Текст ответов</h2>
            <AnswersList 
                countAnswer={countAnswer} 
                answersChange={answersChange} 
                answers={answers} 
                answersCorrectChange={answersCorrectChange}
            />
            <div style={{display:'flex'}}>
                <MyButton onClick={saveQuestions} style={{marginLeft: 'auto', marginTop: '10px', width: '120px'}}>Сохранить</MyButton>
            </div>
            
        </>
    )
}

export default CreateQuestion