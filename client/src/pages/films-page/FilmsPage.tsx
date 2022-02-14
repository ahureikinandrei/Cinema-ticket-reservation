import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';
import style from './filmsPage.module.scss';

const FilmsPage: FC = () => {
    return (
        <main className={style.content}>
            <Container>Films</Container>
        </main>
    );
};

export default FilmsPage;
