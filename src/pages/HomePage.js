import React from 'react';
import './HomePage.css';
import AppNavbar from '../components/app-navbar/app-navbar';
import AppMain from '../components/app-main/app-main';
import AppFooter from '../components/app-footer/app-footer';

function HomePage() {
  return (
    <div className="App">
      <AppNavbar />
      <AppMain />
      <AppFooter />
    </div>
  );
}

export default HomePage;
