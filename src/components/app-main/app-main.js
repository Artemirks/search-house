import React from 'react';
import './app-main.css'
import SearchForm from '../seacrh-form/search-form';
import { useNavigate } from 'react-router-dom';
import { LANDLORD_DASHBOARD_ROUTE } from '../../utils/conts';

function AppMain() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(LANDLORD_DASHBOARD_ROUTE);
    };


    return (
        <div className="app-main">
            <h1>Планируете свою следующую поездку? Начните с поиска жилья здесь!</h1>
            <SearchForm />
            <hr />
            <p id='orText'>Или</p>
            <button className='actionBtn' onClick={handleNavigate}>Сдать жилье</button>
        </div>
    );
}

export default AppMain;