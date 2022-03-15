import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { linkList } from './links';
import { useAppSelector } from '../../../hooks/redux';
import {
    getIsUserAdmin,
    getIsUserAuth,
    getUserID,
} from '../../../redux/users/selectors';

const Navigation: FC = () => {
    const isAdmin = useAppSelector(getIsUserAdmin);
    const isAuth = useAppSelector(getIsUserAuth);
    const userID = useAppSelector(getUserID);
    const { pathname } = useLocation();

    const { admin, navigate, auth } = linkList;
    return (
        <Nav activeKey="/crate">
            {isAdmin &&
                admin.map(({ path, name }) => (
                    <Nav.Link
                        key={path}
                        as={Link}
                        to={path}
                        active={pathname === path}
                    >
                        {name}
                    </Nav.Link>
                ))}
            {isAuth &&
                auth.map(({ path, name }) => {
                    const fullPath = `${path}/${userID}`;
                    return (
                        <Nav.Link
                            key={path}
                            as={Link}
                            to={fullPath}
                            active={pathname === fullPath}
                        >
                            {name}
                        </Nav.Link>
                    );
                })}
            {navigate.map(({ path, name }) => (
                <Nav.Link
                    key={path}
                    as={Link}
                    to={path}
                    active={pathname === path}
                >
                    {name}
                </Nav.Link>
            ))}
        </Nav>
    );
};

export default Navigation;
