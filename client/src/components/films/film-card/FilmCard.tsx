import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import FrontSide from './FrontSide';
import BackSide from './BackSide';
import { IFilm } from '../../../services/types';
import { BASE_URL } from '../../../constants/baseUrl';
import style from './filmCard.module.scss';

interface IFilmCardProps {
    film: IFilm;
}

const FilmCard: FC<IFilmCardProps> = ({ film }) => {
    const navigate = useNavigate();
    const {
        _id,
        name,
        rating,
        img,
        description,
        age,
        endDate,
        startDate,
        genre,
    } = film;

    const onCardClick = (): void => {
        navigate(`/film/${_id}`);
    };

    return (
        <Col md={4} className="mt-3 d-flex justify-content-center">
            {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
            <div role="button" className={style.card} onClick={onCardClick}>
                <FrontSide
                    name={name}
                    rating={rating}
                    img={`${BASE_URL + img}`}
                />
                <BackSide
                    description={description}
                    age={age}
                    endDate={endDate}
                    startDate={startDate}
                    genre={genre}
                />
            </div>
        </Col>
    );
};

export default FilmCard;
