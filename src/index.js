import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import AppRouter from './routing/AppRouter';
import UserStore from './store/UserStore';
import { BrowserRouter } from 'react-router-dom';
import ObjectStore from './store/ObjectStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);


root.render(
  <div>
    <CssBaseline />
    <Context.Provider value={{ user: new UserStore(), object: new ObjectStore() }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Context.Provider>
  </div >
);
