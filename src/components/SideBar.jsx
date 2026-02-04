import React from 'react'
import PointMenu from './PointMenu'
import './SideBar.css'

function SideBar() {
  return (
    <>
        <div className='mainBlock'>
          <img src="src/assets/IRNITU-logo.svg" alt="irnitulogo" />
          <ul>
            <PointMenu icon='src/assets/icon-dash.svg' title='Дашборд'/>
            <p style={{color: 'rgb(136, 132, 132)'}}>ТЕСТИРОВАНИЕ</p>
            <PointMenu link='/tests' icon='src/assets/icon-my-text.svg' title='Мои тесты'/>
            <PointMenu link='/bank' icon='src/assets/icon-bank-questions.svg' title='Банк вопросов'/>
            <p style={{color: 'rgb(136, 132, 132)'}}>АДМИНИСТРИРОВАНИЕ</p>
            <PointMenu icon='src/assets/icon-users.svg' title='Пользователи'/>
          </ul>
        </div>
    </>
    )
}

export default SideBar