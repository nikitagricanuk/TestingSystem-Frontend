import React from 'react'
import { useState } from 'react'
import PageLayout from '../components/PageLayout'
function MyTests() {
    const initialTests = [//массив вопросов
      {id: 1, name: 'Тест 1', category: 'Тригонометрия', count: 123, region: 'Иркутск', avr: 5, date: '18.05.2006'},
      {id: 2, name: 'Тест 2', category: 'Алгебра', count: 456, region: 'Москва', avr: 4, date: '20.05.2006'},
      {id: 3, name: 'Тест 3', category: 'Геометрия', count: 89, region: 'Санкт-Петербург', avr: 3, date: '22.05.2006'},
      {id: 4, name: 'Тест 4', category: 'Математика', count: 250, region: 'Казань', avr: 5, date: '15.05.2006'}
    ]

    const [tests, setTests] = useState(initialTests) // состояние для вопросов
    return (
        <>
            <h1>Мои тесты</h1>

            <PageLayout questions={tests} setQuestions={setTests}></PageLayout>
        </>
    )
}

export default MyTests