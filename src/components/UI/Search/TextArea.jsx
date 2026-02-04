import React from 'react'
import './TextArea.css' 

function TextArea(props) {
  return (
    <textarea {...props} className='textArea'></textarea>
  )
}

export default TextArea