import React from 'react'
import './HeaderTable.css'

function HeaderTable({ options, onSort }) {
  return (
    <div className='header'>
        <div style={{display: 'flex', flex: '1', margin: '8px', justifyContent: 'center', alignItems: 'center'}}>
            <input type="checkbox" name="" id=""/>
        </div>

        {options.map(option => 
            <div key={option.id} className='flex-5 m-2' style={{textAlign: 'center'}}>
                <button style={{display: 'flex', margin: 'auto'}} onClick={() => onSort(option.value)}>
                    {option.name}
                    <img style={{marginLeft: '10px'}} src='src/assets/icon-sort-direction.svg'></img>
                </button>
            </div>
        )}
        <div style={{textAlign: 'center'}} className='flex-1 m-2'>
          <img src="src/assets/icon-change.svg" alt="" />
        </div>
    </div>
  )
}

export default HeaderTable