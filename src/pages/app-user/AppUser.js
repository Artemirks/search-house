import React from 'react';
import AppNavbar from '../../components/app-navbar/app-navbar';
import AppFooter from '../../components/app-footer/app-footer';
import './app-user.css';
import MainUser from '../../components/main-user/MainUser';

const AppUser = () => {
    return (
        <div className='userCabinet'>
            <AppNavbar />
            <MainUser />
            <AppFooter />
        </div>
    );
};

export default AppUser;