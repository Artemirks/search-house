import React, { useContext, useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import ruLocale from "date-fns/locale/ru";
import { getYear, getMonth, parse, format } from 'date-fns';
import './main-user.css';
import { Context } from '../..';
import { getOne, update } from '../../http/userApi';

function range(start, end, step) {
    const result = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}

const MainUser = () => {
    const { user } = useContext(Context)
    const menuItems = ['Управление аккаунтом', 'Изменение пароля', 'Удаление аккаунта'];
    const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [startDate, setStartDate] = useState(null);

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = user.user;
                const data = await getOne(currentUser.id);
                setFirstName(data.first_name || '');
                setLastName(data.last_name || '');
                setCompanyName(data.company_name || '');
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setGender(data.gender || 'М');
                const formattedDate = data.date_of_birth ? new Date(data.date_of_birth) : '';
                setStartDate(formattedDate);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user]);

    const years = range(1940, getYear(new Date()) + 1, 1);
    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];


    const onChange = (dates) => {
        const start = dates;
        setStartDate(start);
    };

    const saveUserData = async () => {
        try {
            const phoneNumber = phone;
            const onlyDigits = phoneNumber.replace(/\D/g, '');
            const userData = {
                id: user.user.id,
                ...(first_name && { first_name }),
                ...(last_name && { last_name }),
                ...(company_name && { company_name }),
                ...(email && { email }),
                ...(onlyDigits && { phone: onlyDigits }),
                ...(gender && { gender }),
                ...(startDate && { date_of_birth: startDate }),
            };
            const data = await update(userData);
            user.setUser(data)
            alert('Данные успешно сохранены');
        } catch (error) {
            console.error('Ошибка при сохранении данных', error);
        }
    };

    return (
        <div className='mainUser'>
            <div className='userMenu'>
                <ul>
                    {menuItems.map((menuItem) => (
                        <li
                            key={menuItem}
                            className={activeMenuItem === menuItem ? 'active' : ''}
                            onClick={() => handleMenuItemClick(menuItem)}
                        >
                            {menuItem}
                        </li>
                    ))}
                </ul>
                <div className='requiredData'>
                    <span className='redStar'>*</span>
                    <span> - Необходимые данные для размещения жилья.</span>
                </div>
            </div>
            <div className='userData'>
                <h2>Личные данные:</h2>
                <div className='inputContainer'>
                    <label htmlFor='firstName'>Имя <span className='redStar'>*</span></label>
                    <input type='text' id='firstName' name='first_name' placeholder='Введите имя' value={first_name}
                        onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='inputContainer'>
                    <label htmlFor='lastName'>Фамилия: <span className='redStar'>*</span></label>
                    <input type='text' id='lastName' name='last_name' value={last_name}
                        onChange={(e) => setLastName(e.target.value)} placeholder='Введите фамилию' />
                </div>
                <div className='inputContainer'>
                    <label htmlFor='companyName'>Название<br />компании:</label>
                    <input type='text' id='companyName' name='company_name' value={company_name}
                        onChange={(e) => setCompanyName(e.target.value)} placeholder='Введите название компании' />
                    <p>Название компании, отеля или гостевого дома</p>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='email'>Email: <span className='redStar'>*</span></label>
                    <input type='email' id='email' name='email' value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder='Введите e-mail' readOnly />
                    <p>Адрес для входа в аккаунт и получения подтверждений бронирований</p>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='phone'>Телефон: <span className='redStar'>*</span></label>
                    <InputMask
                        mask="+7 (999) 999-9999"
                        maskChar="_"
                        id='phone'
                        name='phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <p>Номер телефона для получения подтверждений бронирований</p>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='gender'>Пол:</label>
                    <select id='gender' name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value='М'>Мужской</option>
                        <option value='Ж'>Женский</option>
                    </select>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='birthdate'>Дата<br />рождения: <span className='redStar'>*</span></label>
                    <DatePicker
                        id='birthdate'
                        name='date_of_birth'
                        locale={ruLocale}
                        dateFormat="dd.MM.yyyy"
                        renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <div
                                style={{
                                    margin: 10,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px"
                                }}
                            >
                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                    {"<"}
                                </button>
                                <select
                                    value={getYear(date)}
                                    onChange={({ target: { value } }) => changeYear(value)}
                                >
                                    {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    style={{ width: "200px" }}
                                    value={months[getMonth(date)]}
                                    onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                    }
                                >
                                    {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                    {">"}
                                </button>
                            </div>
                        )}
                        selected={startDate}
                        onChange={onChange}
                    />
                </div>
                <button className='saveButton' onClick={saveUserData}>Сохранить</button>
            </div>
        </div>
    );
};

export default MainUser;
