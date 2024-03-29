import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../..';
import { format, parse } from 'date-fns';
import { getOneUpdate, update } from '../../http/objectApi';

const LastStepCreate = ({ apartmentData, saveData, handlePreviousStep, publishData, setNewData }) => {
    const { user, object } = useContext(Context)

    const parseTimeWithSeconds = (timeString, defaultValue) => {
        try {
            return parse(timeString, 'HH:mm:ss', new Date());
        } catch (error) {
            console.error('Error parsing time:', error);
            return defaultValue;
        }
    };

    const formatTime = (date) => {
        return format(date, 'HH:mm');
    };
    let initialCheckInTime;
    let initialCheckOutTime
    if (apartmentData.check_in_time !== null) {
        initialCheckInTime = formatTime(parseTimeWithSeconds(apartmentData.check_in_time, new Date()));
        initialCheckOutTime = formatTime(parseTimeWithSeconds(apartmentData.check_out_time, new Date()));

    }

    console.log(apartmentData.check_in_time)
    const [check_in_time, setCheckInTime] = useState(apartmentData.check_in_time === null ? '14:00' : initialCheckInTime);
    const [check_out_time, setCheckOutTime] = useState(apartmentData.check_out_time === null ? '12:00' : initialCheckOutTime);

    console.log(check_out_time)
    const [currency, setCurrency] = useState('RUB');
    const [nightly_cost, setNightlyPrice] = useState(apartmentData.nightly_cost || '');
    console.log(check_in_time)
    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const saveObjectrData = async () => {
        try {
            const objectData = {
                id: apartmentData.id,
                ...(check_in_time && { check_in_time }),
                ...(check_out_time && { check_out_time }),
                ...(isNaN(nightly_cost) || nightly_cost === '' ? {} : { nightly_cost: parseFloat(nightly_cost) }),
            };
            const data = await update(objectData);
            let newObject;
            if (data[0] === 1) {
                newObject = await getOneUpdate(apartmentData.id, user.user.id)
                object.setObject(newObject)
                setNewData(newObject)
            }
            publishData();
        } catch (error) {
            console.error('Ошибка при сохранении данных', error);
        }
    };

    return (
        <div className='objectData userData lastPage'>
            <h2>Заезд и отъезд:</h2>
            <div className='inputContainer'>
                <label htmlFor='checkInTime'>Время заезда</label>
                <select
                    id='checkInTime'
                    name='checkInTime'
                    value={check_in_time}
                    onChange={(e) => setCheckInTime(e.target.value)}
                >
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <option key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                        </option>
                    ))}
                </select>
            </div>
            <div className='inputContainer'>
                <label htmlFor='checkOutTime'>Время отъезда</label>
                <select
                    id='checkOutTime'
                    name='checkOutTime'
                    value={check_out_time}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                >
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <option key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                        </option>
                    ))}
                </select>
            </div>
            <h2>Стоимость:</h2>
            <div className='inputContainer'>
                <label htmlFor='currency'>Валюта</label>
                <select id='currency' name='currency' value={currency} onChange={handleCurrencyChange}>
                    <option value='RUB'>RUB</option>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    {/* Другие валюты */}
                </select>
            </div>
            <div className='inputContainer'>
                <label htmlFor='nightlyPrice'>Цена за ночь</label>
                <input
                    type='text'
                    id='nightlyPrice'
                    name='nightlyPrice'
                    value={nightly_cost}
                    onChange={(e) => setNightlyPrice(e.target.value)}
                    placeholder='Введите цену'
                />
            </div>
            <div className='buttonsContainer'>
                <button className='prevButton' onClick={handlePreviousStep}>
                    Назад
                </button>
                <div className='pubWrapper'>
                    <button className='nextButton' onClick={saveObjectrData}>
                        Сохранить информацию
                    </button>
                    <button className='nextButton' onClick={saveObjectrData}>
                        Опубликовать информацию
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LastStepCreate;