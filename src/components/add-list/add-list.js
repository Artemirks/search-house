import React, { useState } from 'react';
import './add-list.css';

function AdList({ apartments, renderMenu }) {
    const [menuOpen, setMenuOpen] = useState(null);

    const handleMenuClick = (apartmentId) => {
        setMenuOpen((prevMenuOpen) => (prevMenuOpen === apartmentId ? null : apartmentId));
    };

    function formatDateTime(date) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('RU', options);
    }
    return (
        <div className="ad-list-container">
            <table className="ad-list-table">
                <thead>
                    <tr>
                        <th>Объявление</th>
                        <th>Статус</th>
                        <th className='headLast'>Последнее изменение</th>
                    </tr>
                </thead>
                <tbody>
                    {apartments.map((apartment) => (
                        <tr>
                            <td>{apartment.name || 'Название отсутствует'}</td>
                            <td className='status_list'>{apartment.listing_status}</td>
                            <td className='lastColumn'>{formatDateTime(new Date(apartment.updatedAt))}{renderMenu(apartment.id, menuOpen, handleMenuClick)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdList;
