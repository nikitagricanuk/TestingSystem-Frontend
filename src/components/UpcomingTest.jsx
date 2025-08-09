import React from 'react'

function UpcomingTest() {
  return (
    <div className='w-85 h-111 bg-white p-5 rounded-2xl m-4'>
        <span><strong>Предстоящие тесты</strong></span>
        <div className='flex justify-center bg-gray-200 w-72 h-10 mx-auto rounded-xl mt-5 px-2'>
            <button className='bg-white rounded-xl shadow-2xl text-center my-auto p-1 grow-1'>
                Все
            </button>
            <button className=' rounded-xl shadow-2xl text-center my-auto p-1 grow-1'>
                Неделя
            </button>
            <button className=' rounded-xl shadow-2xl text-center my-auto p-1 grow-1'>
                Месяц
            </button>
            <button className=' rounded-xl shadow-2xl text-center my-auto p-1 grow-1'>
                Год
            </button>
        </div>

        <div className='w-72 h-11 bg-gray-100 mx-auto rounded-2xl mt-5 px-2'>

        </div>

    </div>
)
}

export default UpcomingTest