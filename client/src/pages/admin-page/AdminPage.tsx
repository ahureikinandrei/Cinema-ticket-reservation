import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';
import style from './adminPage.module.scss';
import CreateFilmForm from '../../components/forms/create-form/CreateFilmForm';

const AdminPage: FC = () => {
    return (
        <main className={style.content}>
            <Container className="d-flex flex-grow-1 justify-content-center">
                <CreateFilmForm />
            </Container>
        </main>
    );
};

export default AdminPage;
