import React, { useState } from 'react';
import './guests-form.css'

function GuestsForm({ currentGuests, updateGuests, toggleGuestMenu, className }) {
    const [guestCount, setGuestCount] = useState(currentGuests);
    const [children, setChildren] = useState(0);
    const [pets, setPets] = useState(false);

    const changeGuestCount = (increment) => {
        if (increment && guestCount < 20) {
            setGuestCount(guestCount + 1);
        } else if (!increment && guestCount > 1) {
            setGuestCount(guestCount - 1);
        }
    };

    const applyChanges = () => {
        updateGuests(guestCount);
        toggleGuestMenu();
    };

    const togglePets = () => {
        setPets(!pets);
    };

    return (
        <div className={className}>
            <div className="select-guests__main">
                <div className="select-guests__main-wrapper">
                    <div className="guests-counter adults">
                        <div className="guests-counter__text">
                            <strong>Количество гостей</strong>
                        </div>
                        <div className="guests-counter__editing">
                            <button onClick={() => changeGuestCount(false)} className="guests-counter__button">
                                <span className="icon-app-minus">-</span>
                            </button>
                            <span className="guests-counter__value">{guestCount}</span>
                            <button onClick={() => changeGuestCount(true)} className=" guests-counter__button">
                                <span className="icon-app-plus">+</span>
                            </button>
                        </div>
                    </div>
                </div>
                <button className="btn_ready" onClick={applyChanges}>Готово</button>
            </div>
        </div>
    );
}

export default GuestsForm;
