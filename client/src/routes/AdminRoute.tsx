import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { getIsUserAdmin } from '../redux/users/selectors';

interface AdminRouter {
    children: ReactElement;
}

export const AdminRouter: FC<AdminRouter> = ({ children }) => {
    const isAdmin = useAppSelector(getIsUserAdmin);
    const location = useLocation();
    if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};
