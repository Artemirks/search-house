import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes';
import { HOME_ROUTE } from '../utils/conts';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { check } from '../http/userApi';

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await check();
                user.setUser(data);
                user.setIsAuth(true);
            } catch (error) {
                console.error(error);
                // Обработка ошибки, например, перенаправление на страницу входа
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [user]);


    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;
