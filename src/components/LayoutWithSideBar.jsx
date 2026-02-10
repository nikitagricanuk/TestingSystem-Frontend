import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

function LayoutWithSideBar() {
  return (
    <div style={{display: 'flex'}}>
        <div style={{width: '308px'}}>
            <SideBar/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', flexGrow: '1'}}>
            <div className='p-7'>
                <Outlet/>
            </div>
        </div>
    </div>
    
  )
}

export default LayoutWithSideBar