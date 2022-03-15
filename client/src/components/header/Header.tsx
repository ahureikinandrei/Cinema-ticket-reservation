import React, { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import AuthButton from '../buttons/auth-button/AuthButton';
import style from './header.module.scss';

const Header: FC = () => (
    <Navbar bg="dark">
        <Container>
            <div className={style.logo}>
                <Link to="/" className={style.logo__text}>
                    Cinema Ticket
                </Link>
            </div>
            <Navigation />
            <AuthButton />
        </Container>
    </Navbar>
);

export default Header;
