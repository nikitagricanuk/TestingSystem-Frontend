import React from 'react'
import './HeaderTable.css'
function TableField({question, options}) {
  return (
    <div className='header' style={{marginTop: '1%'}}>
        <div style={{display: 'flex', flex: '1', margin: '8px', justifyContent: 'center', alignItems: 'center'}}>
            <input type="checkbox" name="" id=""/>
        </div>
        {options.map((option) =>
            <div key={option.id} style={{textAlign: 'center'}} className='flex-5 m-2'>
                <p>{question[option.value]}</p>
            </div>
        )}
        <button style={{textAlign: 'center'}} className='flex-1 m-2'>
          <img src="src/assets/icon-change.svg" alt="" />
        </button>
    </div>
  )
}

export default TableField