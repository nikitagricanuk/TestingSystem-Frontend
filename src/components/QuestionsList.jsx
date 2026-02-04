import React from 'react'
import TableField from './TableField'

function QuestionsList({questions, search, column, options}) {

    const questionsFilter = questions.filter(question => String(question[column]).includes(search))
    
    return (
    <div>
        {questionsFilter.length 
        ? questionsFilter.map(
            (question) => <TableField key = {question.id} question = {question} options={options}/>
        ) 
        : <h3 >Нет совпадений</h3>}
    </div>
  )
}

export default QuestionsList