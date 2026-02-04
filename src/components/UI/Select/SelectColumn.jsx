import React from 'react'


function SelectColumn({value, onChange, options, ...props}) {
  return (
    <select {...props} className='createBut' style={{width: '150px'}} value={value} onChange={event => onChange(event.target.value)}>
      {options.map(option =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )}
    </select>
  )
}

export default SelectColumn