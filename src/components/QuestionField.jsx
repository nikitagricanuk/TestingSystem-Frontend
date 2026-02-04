import React from 'react'
import TextArea from '../components/UI/Search/TextArea'
import ShowingLatex from '../components/ShowingLatex'
import { useState } from 'react'

function QuestionField({field, setfield}) {
    return (
        <>
            <div style={{display: 'flex'}}>
                <p style={{width: '521px'}}><b>Текст вопроса</b></p>
                <p style={{width: '521px', marginLeft: 'auto'}}><b>Предпросмотр вопроса</b></p>
            </div>
            <div className='flex' style={{  width: '1068px'}}>
                <div>
                    <TextArea placeholder="Напишите формулировку задания или вопроса..." value={field} onChange={e => setfield(e.target.value)}></TextArea>
                </div>
                <ShowingLatex field={field}/>
            </div>
        </>
    )
}

export default QuestionField