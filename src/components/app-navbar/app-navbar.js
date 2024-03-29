import React, { useContext } from 'react';
import './app-navbar.css';
import RegistrationModal from '../registration-modal/registration-modal';
import PasswordInput from '../password-input/password-input';
import userPhoto from '../seacrh-form/images/user.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react';
import { HOME_ROUTE, LANDLORD_DASHBOARD_ROUTE, USER_PAGE_ROUTE } from '../../utils/conts';
import { login, registration } from '../../http/userApi';

const AppNavbar = observer(() => {
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [regModalActive, setRegModalActive] = useState(false)
    const [authModalActive, setAuthModalActive] = useState(false)

    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(HOME_ROUTE);
    };

    const handleLandlord = () => {
        navigate(LANDLORD_DASHBOARD_ROUTE)
    };

    const handleUser = () => {
        navigate(USER_PAGE_ROUTE)
    };
    let password;
    const handlePasswordChange = (newPassword) => {
        password = newPassword;
    };

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }

    const signIn = async () => {
        try {
            let dataUser;
            dataUser = await registration(last_name, email, password)
            setRegModalActive(false)
            user.setUser(dataUser)
            user.setIsAuth(true);
            navigate(USER_PAGE_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const auth = async () => {
        try {
            let data;
            data = await login(email, password);
            setAuthModalActive(false)
            user.setUser(data)
            user.setIsAuth(true);
            navigate(HOME_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <header>
            <nav>
                <div className="nav-info">
                    <span onClick={handleNavigate}>GostyRu</span>
                </div>
                {user.isAuth ?
                    <div className="nav-buttons">
                        <button className='actionBtn' id='lk-landlord' onClick={handleLandlord}>Ваши объекты</button>
                        <div className="filter-container actionBtn" id='lk-user' onClick={handleUser}>
                            <img src={userPhoto} alt="Изображение" className="input-image" />
                            <button>{user.user.last_name}</button>
                        </div>

                        <button className='actionBtn' id='out' onClick={() => logOut()}>Выйти</button>
                    </div>
                    :
                    <div className="nav-buttons">
                        <button className='actionBtn' id='reg' onClick={() => setRegModalActive(true)}>Зарегистрироваться</button>
                        <button className='actionBtn' id='auth' onClick={() => setAuthModalActive(true)}>Войти</button>
                    </div>
                }
            </nav>
            <RegistrationModal active={regModalActive} setActive={setRegModalActive}>
                <div className='firstLine'>
                    <span className="close" onClick={() => setRegModalActive(false)}>&times;</span>
                    <h2>Регистрация</h2>
                </div>
                <input type="text" placeholder="Введите фамилию" value={last_name} onChange={e => setLastName(e.target.value)} />
                <input type="email" placeholder="Введите email" onChange={e => setEmail(e.target.value)} />
                <PasswordInput onPasswordChange={handlePasswordChange} />
                {/* <div className='personal'>
                    <label>
                        <input type="checkbox" /> Я согласен на обработку <a href='#'>персональных данных</a>
                    </label>
                </div> */}
                <button onClick={() => { signIn(password) }}>Зарегистрироваться</button>
            </RegistrationModal>
            <RegistrationModal active={authModalActive} setActive={setAuthModalActive}>
                <div className='firstLine'>
                    <span className="close" onClick={() => setAuthModalActive(false)}>&times;</span>
                    <h2>Войти</h2>
                </div>
                <input type="email" placeholder="Введите email" onChange={e => setEmail(e.target.value)} />
                <PasswordInput onPasswordChange={handlePasswordChange} />
                <button onClick={() => { auth(password) }}>Войти</button>
                <a href="#" className='changePass'>Напомнить пароль</a>
            </RegistrationModal>
        </header>
    );
});

export default AppNavbar;
