import React from 'react'
import { useState } from 'react'
import HeaderTable from './HeaderTable'
import QuestionsList from './QuestionsList'
import ParametrArea from './ParametrArea'

function PageLayout({questions, setQuestions}) {

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
  return (
    <>
          <ParametrArea search={search} setSearch={setSearch} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} options={options} way={'/create'}/>

          <HeaderTable options={options} onSort={sortQuestions} sortConfig={sortConfig}/>        

          <QuestionsList questions={questions} search={search} column={selectedColumn} options={options}/>
    </>
  )
}

export default PageLayout