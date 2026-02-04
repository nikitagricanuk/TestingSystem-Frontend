import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

function LayoutWithSideBar() {
  return (
    <div className='flex flex-row' style={{height: '100vh'}}>
        <div>
            <SideBar/>
        </div>        
        <div style={{marginLeft: '308px'}}>
            <div className='p-7'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default LayoutWithSideBar