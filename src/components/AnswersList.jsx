import React from 'react'
import TextArea from './UI/Search/TextArea'
import ShowingLatex from './ShowingLatex'

function AnswersList({countAnswer, answersChange, answers, answersCorrectChange}) {
  return (
    <div>
        {Array.from({ length: countAnswer }).map((_, index) => (
            <div key={index}>
                <div style={{ display: 'flex', width: '1068px'}}>
                    <p style={{width: '521px'}}>Ответ {index + 1}</p>
                    <div style={{display: 'flex', width: '521px', marginLeft: 'auto'}}>
                        <p>Правильный ответ</p>
                        <input checked={answers[index].isCorrect} onChange={e => answersCorrectChange(index, e.target.checked)} type="checkbox" style={{marginInline: '10px'}}/>
                    </div>
                </div>
                
                <div style={{ display: 'flex', width: '1068px'}}>
                    <div>
                        <TextArea 
                            placeholder={"Напишите Ответ " + (index + 1) + " к заданию"} 
                            style={{height: '100px'}} 
                            value={answers[index].answerText} 
                            onChange={e => answersChange(index, e.target.value)}>
                        </TextArea>
                    </div>
                    <ShowingLatex style={{height: '100px'}} field={answers[index].answerText}/>
                </div>
                {console.log(answers)}
                
            </div>
        ))}
    </div>
  )
}

export default AnswersList