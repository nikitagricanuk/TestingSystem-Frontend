import React from 'react'
import './PointMenu.css'
import { Link } from 'react-router-dom'
function PointMenu({ link, icon, title }) {
  return (
    <li> 
      <Link to={link} className='pointMenu list'><img src={icon} alt={icon}/> {title} </Link>
    </li>
  )
}

export default PointMenu