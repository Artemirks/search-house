import React from 'react';
import './appart-item.css';
import defaultImg from '../seacrh-form/images/default.png';

const AppartItem = ({ object, days }) => {
    const getGuestsText = () => {
        if (object.max_guests === 1) {
            return "гость";
        } else if (object.max_guests >= 2 && object.max_guests <= 4) {
            return "гостя";
        } else {
            return "гостей";
        }
    };

    const getRoomText = () => {
        if (object.room_number === 1) {
            return "комната";
        } else if (object.room_number >= 2 && object.room_number <= 4) {
            return "комнаты";
        } else {
            return "комнат";
        }
    };

    return (
        <div className="apartment-card">
            <img src={defaultImg} alt="Apartment" />
            <div className="apartment-details">
                <div className='bottomTop'>
                    <h3>{object.name}</h3>
                    <p className='countGuest'>{object.max_guests} {getGuestsText()}, {object.room_number} {getRoomText()}, {object.apartment_square} м<sup>2</sup></p>
                    <p className='countGuest'>{object.floor_number} этаж из {object.floor_house}</p>
                </div>
                <div className='rating'>
                    512 отзывов
                </div>
                <div className='bottomInfo'>
                    <p className='place'>{object.City.name}, улица {object.name_street}, {object.house_number}</p>
                    <div className='price'>
                        <p><b>{object.nightly_cost} ₽</b> за сутки</p>
                        <p>Всего {object.nightly_cost * days} ₽</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppartItem;