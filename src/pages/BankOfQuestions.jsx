import { useState } from 'react'
import HeaderTable from '../components/HeaderTable'
import QuestionsList from '../components/QuestionsList'
import { useNavigate } from 'react-router-dom'
import ParametrArea from '../components/ParametrArea'
import SearchField from '../components/UI/Search/SearchField'
import MyButton from '../components/UI/Button/MyButton'
import SelectColumn from '../components/UI/Select/SelectColumn'

function BankOfQuestions() {
  const initialQuestions = [//массив вопросов
    {id: 1, name: 'Вопрос 1', category: 'Тригонометрия', count: 123, region: 'Иркутск', avr: 5, date: '18.05.2006'},
    {id: 2, name: 'Вопрос 2', category: 'Алгебра', count: 456, region: 'Москва', avr: 4, date: '20.05.2006'},
    {id: 3, name: 'Вопрос 3', category: 'Геометрия', count: 89, region: 'Санкт-Петербург', avr: 3, date: '22.05.2006'},
    {id: 4, name: 'Вопрос 4', category: 'Математика', count: 250, region: 'Казань', avr: 5, date: '15.05.2006'}
  ]
  
  const [questions, setQuestions] = useState(initialQuestions) // состояние для вопросов

  const [sortConfig, setSortConfig] = useState({//состояние параметров сортировки
    column: null,
    direction: 'asc'
  })

  const sortQuestions = (column) => //функция сортировки столбцов
  {
    let direction = 'acs';

    if (sortConfig.column === column && sortConfig.direction === 'asc')
    {
      direction = 'desc'
    }
    else{
      direction = 'asc'
    }
    setSortConfig({ column, direction })


    const sortedArray = [...questions].sort((a, b) => {

      const aValue = a[column]
      const bValue = b[column]
  
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
  
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue
      }
  
      if (column === 'date') {
        const aDate = new Date(aValue.split('.').reverse().join('-'))
        const bDate = new Date(bValue.split('.').reverse().join('-'))
        return direction === 'asc' ? aDate - bDate : bDate - aDate
      }
      return 0
    })
    setQuestions(sortedArray)
  }

  const [search, setSearch] = useState('') // состояние поиска

  const [selectedColumn, setSelectedColumn] = useState('name'); // состояние селекта

  const options = [ // масив опций 
    {id: 1, value: "name", name: "Название"},
    {id: 2, value: "category", name: "Категория"},
    {id: 3, value: "count", name: "Прошло"},
    {id: 4, value: "region", name: "Регион"},
    {id: 5, value: "avr", name: "Средний балл"},
    {id: 6, value: "date", name: "Дата"}
  ]

  const navigate = useNavigate() // хук для навигации
  return (
    <>
          <h1>Банк вопросов</h1>

          <ParametrArea search={search} setSearch={setSearch} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} options={options}/>

          <HeaderTable options={options} onSort={sortQuestions} sortConfig={sortConfig}/>        

          <QuestionsList questions={questions} search={search} column={selectedColumn} options={options}/>

    </>
  )
}

export default BankOfQuestions
