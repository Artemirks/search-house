import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './seacrh-form.css'
import imgCity from './images/city.png';
import imgDate from './images/date.png'
import imgGuest from './images/guest.png';
import GuestsForm from '../guests-form/guests-form';
import ruLocale from "date-fns/locale/ru";
import { useNavigate } from 'react-router-dom';
import { SEARCH_APP_PAGE } from '../../utils/conts';
import { getCities } from '../../http/objectApi';
import { Context } from '../..';
import { getAll } from '../../http/searchApi';

function SearchForm() {
    const { user, object } = useContext(Context);
    const navigate = useNavigate();
    const [id_city, setIDCity] = useState();
    const [city, setCity] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const [showGuestMenu, setShowGuestMenu] = useState(false);
    const [suggestions, setSuggestions] = useState([]);


    const fetchCitySuggestions = async (inputValue) => {
        try {
            const cities = await getCities(inputValue);
            setSuggestions(cities);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        }
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);

        if (value.length >= 2) {
            fetchCitySuggestions(value);
        }
    };

    const handleSearchApp = async () => {
        if (!id_city || !(startDate && endDate) || guests < 1) {
            alert('Заполните все параметры для поиска');
            return;
        }

        try {
            const data = await getAll(id_city, startDate, endDate, guests);
            object.setObject(data.rows)
            const startDateFormatted = `${startDate.getUTCFullYear()}-${(startDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
            const endDateFormatted = `${endDate.getUTCFullYear()}-${(endDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
            navigate(`${SEARCH_APP_PAGE}?id_city=${id_city}&city=${city}&inputStartDate=${startDateFormatted}&inputEndDate=${endDateFormatted}&guest=${guests}`);

            /* let newObject;
            if (data[0] === 1) {
                newObject = await getOneUpdate(apartmentData.id, user.user.id)
                object.setObject(newObject)
                setNewData(newObject)
            } */
            //handleNextStep();
        } catch (error) {
            console.error('Ошибка при поиске данных', error);
        }
        // Все параметры заполнены, выполняем переход
        // navigate(SEARCH_APP_PAGE);
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end)
    };


    const toggleGuestMenu = () => {
        setShowGuestMenu(!showGuestMenu);
    };

    const updateGuests = (count) => {
        setGuests(count);
    };

    const getGuestsText = () => {
        if (guests === 1) {
            return "гость";
        } else if (guests >= 2 && guests <= 4) {
            return "гостя";
        } else {
            return "гостей";
        }
    };

    const handleSuggestionClick = (id_city, city) => {
        setIDCity(id_city)
        setCity(city);
        setSuggestions([]);
    };

    return (
        <div className="search-form">
            <div className="input-container" id='cityWrapper'>
                <img src={imgCity} alt="Изображение" className="input-image" />
                <input className='text-input' type="text" id='city' name='city' value={city} onChange={handleCityChange} placeholder="Город" autocomplete="off" />
                <ul className={suggestions.length > 0 && city !== '' ? 'suggestions-list city-active' : 'suggestions-list'}>
                    {suggestions.map((city) => (
                        <li onClick={() => handleSuggestionClick(city.id, city.name)}>
                            {city.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="input-container">
                <img src={imgDate} alt="Изображение" className="input-image" />
                <DatePicker
                    className='text-input'
                    selected={startDate || endDate}
                    placeholderText="Даты проживания"
                    onChange={onChange}
                    minDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    locale={ruLocale}
                    dateFormat="dd.MM"
                    isClearable={true}
                />
            </div>
            <div className="input-container">
                <img src={imgGuest} alt="Изображение" className="input-image" />
                <div className="guest-input" onClick={toggleGuestMenu}>
                    <input className='text-input' type="text" placeholder="Гости" value={`${guests} ${getGuestsText()}`}
                        readOnly />
                </div>
                {showGuestMenu && (
                    <GuestsForm currentGuests={guests}
                        updateGuests={updateGuests}
                        toggleGuestMenu={toggleGuestMenu}
                        className={"select-guests"} />
                )}
            </div>
            <button id='searchBtn' onClick={handleSearchApp}>Искать</button>
        </div>
    );
}

export default SearchForm;
