import React from 'react'
import './MyButton.css'

function CreateButton({children, ...props}) {
  return (
    <button {...props} className='createBut'>{children}</button>
  )
}

export default CreateButton