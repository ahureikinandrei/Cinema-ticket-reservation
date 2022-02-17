import React, { FC } from 'react';
import { Row, Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { IFilm } from '../../../services/types';
import { BASE_URL } from '../../../constants/baseUrl';
import style from './filmInfo.module.scss';

interface IFilmInfoProps {
    film: IFilm;
    error: string;
}

const FilmInfo: FC<IFilmInfoProps> = ({ film, error }) => {
    const { img, name, description, startDate, genre, rating, age } = film;

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-3 text-light">
            <div className="d-flex flex-wrap">
                <Image width={220} height={326} src={`${BASE_URL}/${img}`} />
                <div className="d-flex flex-column justify-content-start p-3">
                    <h2 className="fs-5">{name}</h2>
                    Genre: {genre}
                    <hr />
                    Release date: {startDate}
                    <hr />
                    IMDb Rating:
                    <Rating
                        initialValue={+rating}
                        ratingValue={0}
                        fillColor="gold"
                        size={30}
                        readonly
                    />
                    <hr />
                    Rated: {age}
                </div>
            </div>
            <Row className={style.description}>{description}</Row>
        </div>
    );
};

export default FilmInfo;
