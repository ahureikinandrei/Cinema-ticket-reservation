import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { getIsUserAuth } from '../redux/users/selectors';

interface PublicRouter {
    children: ReactElement;
}

export const PrivateRouter: FC<PublicRouter> = ({ children }) => {
    const isAuth = useAppSelector(getIsUserAuth);
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/home" state={{ from: location }} />;
    }

    return children;
};
