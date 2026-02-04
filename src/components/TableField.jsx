import React from 'react'
import './HeaderTable.css'
function TableField({question, options}) {
  return (
    <div className='header' style={{marginTop: '1%'}}>
        <div className='flex-1 m-2'>
            <input type="checkbox" name="" id=""/>
        </div>
        {options.map((option) =>
            <div key={option.id} style={{textAlign: 'center'}} className='flex-5 m-2'>
                <p>{question[option.value]}</p>
            </div>
        )}
    </div>
  )
}

export default TableField