import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouter {
    children: ReactElement;
}

export const PublicRouter: FC<PublicRouter> = ({ children }) => {
    const isAuth = true;
    const location = useLocation();

    if (isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};
