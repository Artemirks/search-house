import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../seacrh-form/seacrh-form.css';
import imgFilter from '../seacrh-form/images/filter.png';
import GuestsForm from '../guests-form/guests-form';
import ruLocale from "date-fns/locale/ru";
import './ListAppart.css';
import { observer } from 'mobx-react';
import { Context } from '../..';
import AppartItem from '../apartment-item/AppartItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAll } from '../../http/searchApi';
import { SEARCH_APP_PAGE } from '../../utils/conts';

const ListAppart = observer(() => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { object } = useContext(Context);
    const [id_city, setIDCity] = useState(parseInt(searchParams.get('id_city')));
    const [city, setCity] = useState(searchParams.get('city'));
    const [startDate, setStartDate] = useState(new Date(searchParams.get('inputStartDate')));
    const [endDate, setEndDate] = useState(new Date(searchParams.get('inputEndDate')));
    const [guests, setGuests] = useState(parseInt(searchParams.get('guest')));
    const [showGuestMenu, setShowGuestMenu] = useState(false);
    const [activeOption, setActiveOption] = useState('popularity');
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end)
    };

    const navigate = useNavigate();

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


    const handleSortClick = (option) => {
        setActiveOption(option);
        // Добавьте здесь логику сортировки
    };

    function countDaysBetweenDates(date1, date2) {
        const oneDayMilliseconds = 24 * 60 * 60 * 1000;

        const timeDifference = Math.abs(date2 - date1);

        const daysDifference = Math.ceil(timeDifference / oneDayMilliseconds);


        return daysDifference === 0 ? 1 : daysDifference;
    }

    const daysBetweenDates = countDaysBetweenDates(new Date(searchParams.get('inputStartDate')), new Date(searchParams.get('inputEndDate')));

    const handleSearchApp = async () => {
        if (!id_city || !(startDate && endDate) || guests < 1) {
            alert('Заполните все параметры для поиска');
            return;
        }

        try {
            const data = await getAll(id_city, startDate, endDate, guests);
            object.setObject(data.rows)
            console.log(data.rows)
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

    return (
        <div className='list-appart'>
            <div className="filter-section">
                <div className="filter-container">
                    <img src={imgFilter} alt="Изображение" className="input-image" />
                    <button className="filter-btn">Дополнительные фильтры</button>
                </div>
                <div className="search-inputs">
                    <input className='filter-input' type="text" id='city' name='city' value={city} placeholder="Город" autocomplete="off" />
                    <DatePicker
                        className='filter-input'
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
                    <div className="filter-container">
                        <div className="guest-input" onClick={toggleGuestMenu}>
                            <input className='filter-input guest' type="text" placeholder="Гости" value={`${guests} ${getGuestsText()}`}
                                readOnly />
                        </div>
                        {showGuestMenu && (
                            <GuestsForm currentGuests={guests}
                                updateGuests={updateGuests}
                                toggleGuestMenu={toggleGuestMenu}
                                className={"filter-guests"} />
                        )}
                    </div>
                    <button id='searchBtnAppart' onClick={handleSearchApp}>Искать</button>
                </div>
            </div>
            <div className="result-section">
                <div className='sort'>
                    <p>Сортировка:</p>
                    <div>
                        <span
                            className={activeOption === 'popularity' ? 'active' : ''}
                            onClick={() => handleSortClick('popularity')}
                        >
                            По популярности
                        </span>
                    </div>
                    <div>
                        <span
                            className={activeOption === 'rating' ? 'active' : ''}
                            onClick={() => handleSortClick('rating')}
                        >
                            По рейтингу
                        </span>
                    </div>
                    <div>
                        <span
                            className={activeOption === 'price' ? 'active' : ''}
                            onClick={() => handleSortClick('price')}
                        >
                            По цене
                        </span>
                    </div>
                </div>
                {object.objects.map(object =>
                    <AppartItem key={object.id} object={object} days={daysBetweenDates} />
                )}
            </div>
        </div >
    );
});

export default ListAppart;