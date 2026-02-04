import React from 'react'
import MyButton from '../components/UI/Button/MyButton'

function CounterQuestions({setAnswers, countAnswer, setCountAnswer}) {
    const validCounterMin = () => { 
        if (countAnswer > 2){
            setCountAnswer(countAnswer - 1)
            setAnswers(prev => prev.slice(0, -1))
        }
    }
    const validCounterMax = () => { 
        if (countAnswer < 20){
            setCountAnswer(countAnswer + 1)
            setAnswers(prev => [...prev, {answerText: '',isCorrect: false}])
        } 
    }    

    return (
        <div style={{display: 'flex', width: '521px'}}>
            <div>
                <MyButton style={{width: '50px'}} onClick={() => validCounterMin()}>-</MyButton>
            </div>
            <span style={{marginTop: 'auto', marginBottom: 'auto', marginInline: '10px', fontSize: '20px'}}>{countAnswer}</span>
            <div>
                <MyButton style={{width: '50px'}} onClick={() => validCounterMax()}>+</MyButton>
            </div>
        </div>
    )
}

export default CounterQuestions