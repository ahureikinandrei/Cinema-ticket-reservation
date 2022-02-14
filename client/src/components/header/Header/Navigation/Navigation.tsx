import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { linkList } from './links';

const Navigation: FC = () => {
    const isAdmin = true;
    const { admin, navigate } = linkList;
    return (
        <Nav>
            {isAdmin &&
                admin.map(({ path, name }) => (
                    <Nav.Link
                        key={path}
                        as={Link}
                        to={path}
                        className="text-light"
                    >
                        {name}
                    </Nav.Link>
                ))}
            {navigate.map(({ path, name }) => (
                <Nav.Link key={path} as={Link} to={path} className="text-light">
                    {name}
                </Nav.Link>
            ))}
        </Nav>
    );
};

export default Navigation;
