import React, { FC } from 'react';
import { Row } from 'react-bootstrap';
import FilmCard from './film-card/FilmCard';

const films: number[] = [1, 2, 3, 4, 5, 6];

const Films: FC = () => {
    return (
        <Row className="d-flex">
            {films.map((item) => (
                <FilmCard key={item} />
            ))}
        </Row>
    );
};

export default Films;
