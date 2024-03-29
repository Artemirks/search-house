import React from 'react';
import AppNavbar from '../../components/app-navbar/app-navbar';
import AppFooter from '../../components/app-footer/app-footer';
import LandlordMain from '../../components/landlord-main/landlord-main';
import './app-landlord.css';

function LandlordDashboard() {
    return (
        <div className='landlordDashboard'>
            <AppNavbar />
            <LandlordMain />
            <AppFooter />
        </div>
    );
}

export default LandlordDashboard;
