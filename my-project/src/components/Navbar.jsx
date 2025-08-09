import React from 'react'

function Navbar() {
  return (
    <div className='bg-white w-75 h-250 border border-gray-300'>

        <div className='mx-auto text-center '>Система тестирования <br /> ИРНИТУ</div> 

        <div className='w-60 h-45 bg-gray-100 rounded-2xl mx-auto mt-5 py-1'>
            <button className='w-55 h-10 bg-white rounded-2xl mx-auto block m-3'>
                Главная
            </button>
            <button className='w-55 h-10 bg-white mx-auto block rounded-2xl my-3'>
                Рейтинг
            </button>
            <button className='w-55 h-10 bg-white mx-auto block rounded-2xl m-3'>
                Мои результаты
            </button>
        </div>

        <div className='bg-gray-100 w-62 h-30 mx-auto rounded-2xl mt-150 py-0.5'>
            <button className='w-55 h-10 bg-white mx-auto block rounded-2xl m-3'>
                Настройки
            </button>
            <button className='w-55 h-10 bg-white mx-auto block rounded-2xl m-3'>
                Выйти
            </button>
        </div>

    </div>
  )
}

export default Navbar