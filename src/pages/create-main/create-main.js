import React from 'react';
import AppNavbar from '../../components/app-navbar/app-navbar';
import AppFooter from '../../components/app-footer/app-footer';
import CreateApartment from '../../components/create-appartment/create-appartment';
import './create-main.css';

function CreateMain() {
    return (
        <div className='createApp'>
            <AppNavbar />
            <CreateApartment />
            <AppFooter />
        </div>
    );
}

export default CreateMain;
