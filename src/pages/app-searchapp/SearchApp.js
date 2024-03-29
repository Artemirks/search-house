import React from 'react';
import './app-search.css';
import AppNavbar from '../../components/app-navbar/app-navbar';
import ListAppart from '../../components/list-appartments/ListAppart';
import AppFooter from '../../components/app-footer/app-footer';

const SearchApp = () => {
    return (
        <div className='searchMain'>
            <AppNavbar />
            <ListAppart />
            <AppFooter />
        </div >
    );
};

export default SearchApp;