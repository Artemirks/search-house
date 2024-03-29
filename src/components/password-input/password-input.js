import React, { useState } from 'react';
import './password-input.css';
function PasswordInput({ onPasswordChange }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
        onPasswordChange(newPassword);
    };

    return (
        <div className="password-input">
            <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Введите пароль" onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <span className={passwordVisible ? "password-toggle view" : 'password-toggle'} onClick={togglePasswordVisibility}>
            </span>
        </div>
    );
}

export default PasswordInput;