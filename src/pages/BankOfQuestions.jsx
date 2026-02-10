import { useState } from 'react'
import PageLayout from '../components/PageLayout'

function BankOfQuestions() {
  const initialQuestions = [//массив вопросов
    {id: 1, name: 'Вопрос 1', category: 'Тригонометрия', count: 123, region: 'Иркутск', avr: 5, date: '18.05.2006'},
    {id: 2, name: 'Вопрос 2', category: 'Алгебра', count: 456, region: 'Москва', avr: 4, date: '20.05.2006'},
    {id: 3, name: 'Вопрос 3', category: 'Геометрия', count: 89, region: 'Санкт-Петербург', avr: 3, date: '22.05.2006'},
    {id: 4, name: 'Вопрос 4', category: 'Математика', count: 250, region: 'Казань', avr: 5, date: '15.05.2006'}
  ]
  
  const [questions, setQuestions] = useState(initialQuestions) // состояние для вопросов

  return (
    <>
          <h1>Банк вопросов</h1>
          <PageLayout questions={questions} setQuestions={setQuestions}></PageLayout>
    </>
  )
}

export default BankOfQuestions
