import React, { useContext, useState, useEffect } from 'react';
import { getAppartTypes, getCities, getOneUpdate, update } from '../../http/objectApi';
import { Context } from '../..';

const FirstStepCreate = ({ apartmentData, handleNextStep, setNewData }) => {
    const { user, object } = useContext(Context)
    const [name, setName] = useState(apartmentData.name || '');
    const [description, setDescription] = useState(apartmentData.description || '');
    const [name_city, setCityName] = useState(apartmentData.City !== null ? apartmentData.City.name : '');
    const [name_street, setNameStreet] = useState(apartmentData.name_street || '');
    const [house_number, setHouseNumber] = useState(apartmentData.house_number || '');
    const [id_city, setIdCity] = useState('');
    const [apartmentTypes, setApartmentTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(apartmentData.id_apartmentType || 1);
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const fetchApartmentTypes = async () => {
            try {
                const typesApp = await getAppartTypes();
                setApartmentTypes(typesApp);
            } catch (error) {
                console.error('Ошибка при получении типов объектов:', error);
            }
        };

        fetchApartmentTypes();
    }, []);

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
        setCityName(value);

        if (value.length >= 2) {
            fetchCitySuggestions(value);
        }
    };

    const handleSuggestionClick = (id, city) => {
        setIdCity(id)
        setCityName(city);
        setSuggestions([]);
    };

    const saveObjectrData = async () => {
        try {
            const objectData = {
                id: apartmentData.id,
                ...(name && { name }),
                ...(description && { description }),
                ...(id_city && { id_city }),
                ...(name_street && { name_street }),
                ...(house_number && { house_number }),
                ...(selectedType && { id_apartmentType: selectedType }),
            };
            const data = await update(objectData);
            let newObject;
            if (data[0] === 1) {
                newObject = await getOneUpdate(apartmentData.id, user.user.id)
                object.setObject(newObject)
                setNewData(newObject)
            }
            handleNextStep();
        } catch (error) {
            console.error('Ошибка при сохранении данных', error);
        }
    };


    return (
        <div className='objectData userData'>
            <h2>Информация об объявлении:</h2>
            <div className='inputContainer'>
                <label htmlFor='name'>Название объекта</label>
                <input type='text' id='name' name='name' placeholder='Введите название' value={name}
                    onChange={(e) => setName(e.target.value)} />
                <p>Название будет заголовком вашей страницы на нашем сайте</p>
            </div>
            <div className='inputContainer'>
                <label htmlFor='lastName'>Описание</label>
                <textarea type='text' id='description' name='description' value={description}
                    onChange={(e) => setDescription(e.target.value)} placeholder='Введите описание' />
            </div>
            <div className='inputContainer'>
                <label htmlFor='id_apartmentType'>Тип объекта</label>
                <select id='id_apartmentType' name='id_apartmentType' value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}>
                    {apartmentTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='inputContainer' id='cityWrapper'>
                <label htmlFor='companyName'>Населенный пункт</label>
                <input type='text' id='companyName' name='company_name' value={name_city}
                    onChange={handleCityChange} placeholder='Начните писать название' />
                <ul className={suggestions.length > 0 && name_city !== '' ? 'suggestions-list city-active' : 'suggestions-list'}>
                    {suggestions.map((city) => (
                        <li id={city.id} onClick={() => handleSuggestionClick(city.id, city.name)}>
                            {city.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='inputContainer'>
                <label htmlFor='name_street'>Улица</label>
                <input type='text' id='name_street' name='name_street' value={name_street}
                    onChange={(e) => setNameStreet(e.target.value)} placeholder='Введите название улицы' />
            </div>
            <div className='inputContainer'>
                <label htmlFor='house_number'>Номер дома</label>
                <input type='text' id='house_number' name='house_number' value={house_number}
                    onChange={(e) => setHouseNumber(e.target.value)} placeholder='Введите номер дома' />
            </div>
            <button className="nextButton" onClick={saveObjectrData}>Далее</button>
        </div>

    );
};

export default FirstStepCreate;