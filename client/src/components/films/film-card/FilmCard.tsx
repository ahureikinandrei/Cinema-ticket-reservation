import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import style from './filmCard.module.scss';
import FrontSide from './FrontSide';
import BackSide from './BackSide';

const FilmCard: FC = () => {
    return (
        <Col md={4} className="mt-3">
            <div className={style.card}>
                <FrontSide />
                <BackSide />
            </div>
        </Col>
    );
};

export default FilmCard;
