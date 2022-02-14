import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouter {
    children: ReactElement;
}

export const PrivateRouter: FC<PublicRouter> = ({ children }) => {
    const isAuth = false;
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/signIn" state={{ from: location }} />;
    }

    return children;
};
