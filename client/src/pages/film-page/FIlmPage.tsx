import React, { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import FilmService from '../../services/film.service';
import { UNEXPECTED_ERROR } from '../../constants/messages';
import { IFilm } from '../../services/types';
import style from './filmPage.module.scss';
import FilmInfo from '../../components/films/film-info/FilmInfo';

const FilmPage: FC = () => {
    const [film, setFilm] = useState<IFilm>({} as IFilm);
    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();

    const getFilm = async (): Promise<void> => {
        try {
            const response = await FilmService.getFilmById(id);
            setFilm(response.data);
            setLoading(false);
        } catch (e) {
            if (e.response) {
                setError(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
    };

    useEffect(() => {
        getFilm();
    }, []);

    return (
        <main className={style.content}>
            <Container className="d-flex flex-grow-1 justify-content-center">
                {isLoading ? (
                    <Spinner animation="grow" variant="light" />
                ) : (
                    <FilmInfo film={film} error={error} />
                )}
            </Container>
        </main>
    );
};

export default FilmPage;
