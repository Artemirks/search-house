
import React from 'react';
import './app-footer.css'
import { useNavigate } from 'react-router-dom';
import { USER_PAGE_ROUTE } from '../../utils/conts';

function AppFooter() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(USER_PAGE_ROUTE)
    }

    return (
        <div className="app-footer">
            <a href="#" onClick={handleNavigate}>Личный кабинет</a>
            <a href="/support">Служба поддержки</a>
        </div>
    );
}

export default AppFooter;