import React, { useContext, useState, useEffect } from 'react';
import { getBedTypes, getOneUpdate, update } from '../../http/objectApi';
import { Context } from '../..';

const SecondStepCreate = ({ apartmentData, handleNextStep, handlePreviousStep, setNewData }) => {
    const { user, object } = useContext(Context)
    const [floor_number, setFloor] = useState(apartmentData.floor_number || 1);
    const [floor_house, setTotalFloors] = useState(apartmentData.floor_house || 1);
    const [apartment_square, setArea] = useState(apartmentData.apartment_square || '');
    const [room_number, setTotalRooms] = useState(apartmentData.room_number || 1);
    const [bedroom_number, setBedrooms] = useState(apartmentData.bedroom_number || 0);
    const [max_guests, setGuests] = useState(apartmentData.max_guests || 1);
    const [is_children, setChildFriendly] = useState(apartmentData.is_children || false);
    const [beds, setBeds] = useState([apartmentData.beds || { type: '1', count: 1 }]);
    const [bedTypes, setBedTypes] = useState([]);

    useEffect(() => {
        const fetchApartmentTypes = async () => {
            try {
                const typesBeds = await getBedTypes();
                setBedTypes(typesBeds);
            } catch (error) {
                console.error('Ошибка при получении типов объектов:', error);
            }
        };

        fetchApartmentTypes();
    }, []);

    const handleBedChange = (index, field, value) => {
        setBeds((prevBeds) =>
            prevBeds.map((bed, i) => (i === index ? { ...bed, [field]: value } : bed))
        );
    };

    const addBed = () => {
        setBeds((prevBeds) => [...prevBeds, { type: '1', count: 1 }]);
    };

    const removeBed = (index) => {
        setBeds((prevBeds) => prevBeds.filter((_, i) => i !== index));
    };

    const saveObjectrData = async () => {
        try {
            const objectData = {
                id: apartmentData.id,
                ...(floor_number && { floor_number }),
                ...(floor_house && { floor_house }),
                ...(isNaN(apartment_square) || apartment_square === '' ? {} : { apartment_square: parseFloat(apartment_square) }),
                ...(room_number && { room_number }),
                ...(bedroom_number && { bedroom_number }),
                ...(max_guests && { max_guests }),
                ...(is_children && { is_children }),
                ...(beds && { beds }),
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
            <h2>Общие сведения:</h2>
            <div className='wrapperOb'>
                <div className='inputContainer stepperContainer'>
                    <label htmlFor='floor'>Этаж</label>
                    <div className='stepper'>
                        <button onClick={() => setFloor((prevFloor) => Math.max(0, prevFloor - 1))}>-</button>
                        <span>{floor_number}</span>
                        <button onClick={() => setFloor((prevFloor) => prevFloor + 1)}>+</button>
                    </div>
                </div>
                <div className='inputContainer stepperContainer'>
                    <label htmlFor='totalFloors'>Этажей в доме</label>
                    <div className='stepper'>
                        <button onClick={() => setTotalFloors((prevTotalFloors) => Math.max(1, prevTotalFloors - 1))}>-</button>
                        <span>{floor_house}</span>
                        <button onClick={() => setTotalFloors((prevTotalFloors) => prevTotalFloors + 1)}>+</button>
                    </div>
                </div>
                <div className='inputContainer' id='areaContainer'>
                    <label htmlFor='area'>Площадь (в квадратных метрах)</label>
                    <input
                        type='text'
                        id='area'
                        name='area'
                        value={apartment_square}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder='Введите площадь'
                    />
                </div>
                <div className='inputContainer stepperContainer'>
                    <label htmlFor='totalFloors'>Количество комнат</label>
                    <div className='stepper'>
                        <button onClick={() => setTotalRooms((prevTotalRooms) => Math.max(1, prevTotalRooms - 1))}>-</button>
                        <span>{room_number}</span>
                        <button onClick={() => setTotalRooms((prevTotalRooms) => prevTotalRooms + 1)}>+</button>
                    </div>
                    <p>Только жилые комнаты</p>
                </div>
            </div>
            <h2>Вместимость:</h2>
            <div className='inputContainer stepperContainer'>
                <label htmlFor='bedrooms'>Количество спален</label>
                <div className='stepper'>
                    <button onClick={() => setBedrooms((prevBedrooms) => Math.max(0, prevBedrooms - 1))}>-</button>
                    <span>{bedroom_number}</span>
                    <button onClick={() => setBedrooms((prevBedrooms) => prevBedrooms + 1)}>+</button>
                </div>
                <p>Спальни с отдельным входом и дверью (проходные комнаты не учитываются)</p>
            </div>
            <div className='wrapperG'>
                <div className='inputContainer stepperContainer'>
                    <label htmlFor='guests'>Количество гостей</label>
                    <div className='stepper'>
                        <button onClick={() => setGuests((prevGuests) => Math.max(1, prevGuests - 1))}>-</button>
                        <span>{max_guests}</span>
                        <button onClick={() => setGuests((prevGuests) => prevGuests + 1)}>+</button>
                    </div>
                </div>
                <div className='inputContainer switchContainer' id='children'>
                    <label>Размещение с детьми</label>
                    <div className='switch'>
                        <input
                            type='checkbox'
                            id='childFriendly'
                            name='childFriendly'
                            checked={is_children}
                            onChange={() => setChildFriendly((prevChildFriendly) => !prevChildFriendly)}
                        />
                        <label htmlFor='childFriendly'></label>
                    </div>
                </div>
            </div>
            <div className='inputContainer' id='inputBeds'>
                <label>Тип и количество кроватей</label>
                <div className=''>
                    {beds.map((bed, index) => (

                        <div key={index} className='bedContainer'>
                            <select
                                value={bed.type}
                                onChange={(e) => handleBedChange(index, 'type', e.target.value)}
                            >
                                {bedTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className='stepper'>
                                <button onClick={() => handleBedChange(index, 'count', Math.max(1, bed.count - 1))}>
                                    -
                                </button>
                                <span>{bed.count}</span>
                                <button onClick={() => handleBedChange(index, 'count', bed.count + 1)}>+</button>
                            </div>
                            <button className='removeBed' onClick={() => removeBed(index)}>
                                Удалить
                            </button>
                        </div>
                    ))}
                    <button className='addBed' onClick={addBed}>
                        + Добавить кровать
                    </button>
                </div>

            </div>
            <div className='buttonsContainer'>
                <button className='prevButton' onClick={handlePreviousStep}>Назад</button>
                <button className='nextButton' onClick={saveObjectrData}>Далее</button>
            </div>
        </div>
    );
};

export default SecondStepCreate;
