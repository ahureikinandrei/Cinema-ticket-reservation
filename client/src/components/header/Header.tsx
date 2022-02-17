import React, { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import AuthButton from '../buttons/auth-button/AuthButton';

const Header: FC = () => (
    <Navbar bg="dark">
        <Container>
            <Navbar.Brand as={Link} to="/" className="me-auto text-light">
                Cinema Ticket
            </Navbar.Brand>
            <Navigation />
            <AuthButton />
        </Container>
    </Navbar>
);

export default Header;
