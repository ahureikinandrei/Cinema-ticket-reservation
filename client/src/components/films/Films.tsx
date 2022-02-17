import React, { FC } from 'react';
import { Row } from 'react-bootstrap';
import FilmCard from './film-card/FilmCard';
import { IFilm } from '../../services/types';

interface IFilmsProps {
    films: IFilm[];
}

const Films: FC<IFilmsProps> = ({ films }) => {
    return (
        <Row className="d-flex flex-grow-1 justify-content-between">
            {films.map((film) => (
                <FilmCard key={film._id} film={film} />
            ))}
        </Row>
    );
};

export default Films;
