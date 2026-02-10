import React from 'react'
import SearchField from '../components/UI/Search/SearchField'
import MyButton from '../components/UI/Button/MyButton'
import SelectColumn from '../components/UI/Select/SelectColumn'
import { useNavigate } from 'react-router-dom'

function ParametrArea({search, setSearch, selectedColumn, setSelectedColumn, options, way}) {
    const navigate = useNavigate('')
    return (
        <div style={{display: 'flex', height: '40px', marginTop: '10px', marginBottom: '10px', alignItems: 'center'}}>
        <div>
            <SearchField value={search} placeholder='Поиск...' onChange={e => setSearch(e.target.value)}/>
        </div>
        <div style={{marginInline: '10px'}}>
            <SelectColumn value={selectedColumn} onChange={setSelectedColumn} options={options}/>
        </div>
        <div style={{marginLeft: 'auto'}}>
            <MyButton onClick={() => navigate(way)}>
                + Создать
            </MyButton>
        </div>
        </div>
    )
}

export default ParametrArea