import React from 'react'
import './ShowingLatex.css'
import Latex from 'react-latex'

function ShowingLatex({field, ...props}) {

  const lines = field.split('\n')
  
  return (
    <div {...props} className='latex'>
      {lines.map((line, index) => {
        if (line.trim() === '') {
          return <br key={index} />
        }
        
        return (
          <div key={index}>
            <Latex>{line}</Latex>
          </div>
        )
      })}
    </div>
  )
}

export default ShowingLatex