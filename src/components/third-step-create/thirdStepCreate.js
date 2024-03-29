import React, { useContext, useState, useEffect } from 'react';
import { getKitchenTypes } from '../../http/objectApi';
import { Context } from '../..';

const ThirdStepCreate = ({ handleNextStep, handlePreviousStep }) => {
    const { user, object } = useContext(Context)
    const [bathroomCombined, setBathroomCombined] = useState(false);
    const [amenitiesInBathroom, setAmenitiesInBathroom] = useState('');
    const [kitchenType, setKitchenType] = useState('');
    const [otherAmenities, setOtherAmenities] = useState('');
    const [kitchenTypes, setKitchenTypes] = useState([]);

    useEffect(() => {
        const fetchApartmentTypes = async () => {
            try {
                const typesKitchen = await getKitchenTypes();
                setKitchenTypes(typesKitchen);
            } catch (error) {
                console.error('Ошибка при получении типов объектов:', error);
            }
        };

        fetchApartmentTypes();
    }, []);

    // Преобразование строки с удобствами в массив
    const selectedAmenities = amenitiesInBathroom.split(',');

    // Функция для обновления выбранных удобств
    const handleAmenitiesChange = (selected) => {
        const index = selectedAmenities.indexOf(selected);

        if (index === -1) {
            // Если удобство не выбрано, добавляем в массив
            selectedAmenities.push(selected);
        } else {
            // Если удобство уже выбрано, убираем из массива
            selectedAmenities.splice(index, 1);
        }

        // Обновляем значение в состоянии
        setAmenitiesInBathroom(selectedAmenities.join(','));
    };


    return (
        <div className='objectData userData'>
            <h2>Ванная Комната:</h2>

            <div className='inputContainer switchContainer' id='bathroom'>
                <label>Ванная комната совмещена с туалетом</label>
                <div className='switch'>
                    <input
                        type='checkbox'
                        id='bathroomCombined'
                        name='bathroomCombined'
                        checked={bathroomCombined}
                        onChange={() => setBathroomCombined((prevValue) => !prevValue)}
                    />
                    <label htmlFor='bathroomCombined'></label>
                </div>
            </div>
            <h3>Удобства в ванной комнате</h3>
            <div className='inputContainer'>
                <div className='amenitiesCheckboxContainer'>
                    {/* Добавляем чекбоксы для каждого удобства */}
                    <label>
                        <input
                            type='checkbox'
                            value='shower'
                            checked={selectedAmenities.includes('shower')}
                            onChange={() => handleAmenitiesChange('shower')}
                        />
                        Душ
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='bath'
                            checked={selectedAmenities.includes('bath')}
                            onChange={() => handleAmenitiesChange('bath')}
                        />
                        Ванна
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='shower_cabin'
                            checked={selectedAmenities.includes('shower_cabin')}
                            onChange={() => handleAmenitiesChange('shower_cabin')}
                        />
                        Душевая кабина
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='towel'
                            checked={selectedAmenities.includes('towel')}
                            onChange={() => handleAmenitiesChange('towel')}
                        />
                        Полотенце
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='hair_dryer'
                            checked={selectedAmenities.includes('hair_dryer')}
                            onChange={() => handleAmenitiesChange('hair_dryer')}
                        />
                        Фен
                    </label>
                </div>
            </div>
            <h2 id='anotherH2'>Другие удобства:</h2>
            <div className='inputContainer' id='anotherWrapper'>
                <div className='inputContainer'>
                    <label>Тип кухни</label>
                    <select
                        id='kitchenType'
                        name='kitchenType'
                        value={kitchenType}
                        onChange={(e) => setKitchenType(e.target.value)}
                    >
                        {kitchenTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <h3>Удобства</h3>
                <div className='inputContainer'>
                    <div className='amenitiesCheckboxContainer'>
                        {/* Добавляем чекбоксы для каждого удобства */}
                        <label>
                            <input
                                type='checkbox'
                                value='balcony'
                                checked={selectedAmenities.includes('balcony')}
                                onChange={() => handleAmenitiesChange('balcony')}
                            />
                            Балкон
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                value='smart_tv'
                                checked={selectedAmenities.includes('smart_tv')}
                                onChange={() => handleAmenitiesChange('smart_tv')}
                            />
                            Smart TV
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                value='elevator'
                                checked={selectedAmenities.includes('elevator')}
                                onChange={() => handleAmenitiesChange('elevator')}
                            />
                            Лифт
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                value='wifi'
                                checked={selectedAmenities.includes('wifi')}
                                onChange={() => handleAmenitiesChange('wifi')}
                            />
                            Wi-Fi
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                value='microwave'
                                checked={selectedAmenities.includes('microwave')}
                                onChange={() => handleAmenitiesChange('microwave')}
                            />
                            Микроволновка
                        </label>
                    </div>
                </div>

            </div>
            <div className='buttonsContainer'>
                <button className='prevButton' onClick={handlePreviousStep}>Назад</button>
                <button className='nextButton' onClick={handleNextStep}>Далее</button>
            </div>
        </div>
    );
};

export default ThirdStepCreate;
