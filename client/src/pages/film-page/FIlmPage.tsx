import React, { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import FilmService from '../../services/film.service';
import { IFilm, ISessionData } from '../../services/types';
import SessionService from '../../services/session.service';
import FilmInfo from '../../components/films/film-info/FilmInfo';
import SessionList from '../../components/sessions/sessions-list/SessionList';
import { UNEXPECTED_ERROR } from '../../constants/messages';
import style from './filmPage.module.scss';

const FilmPage: FC = () => {
    const [film, setFilm] = useState<IFilm>({} as IFilm);
    const [sessions, setSessions] = useState<ISessionData[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSessions, setLoadingSessions] = useState(true);
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

    const getSessionsInfo = async (): Promise<void> => {
        try {
            const response = await SessionService.getSessionsByFilmsId(id);
            setSessions(response.data);
        } catch (e) {
            if (e.response) {
                setError(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
        setLoadingSessions(false);
    };

    useEffect(() => {
        getFilm();
        getSessionsInfo();
    }, []);

    return (
        <main className={style.content}>
            <Container className={style.container}>
                {isLoading ? (
                    <Spinner animation="grow" variant="light" />
                ) : (
                    <FilmInfo film={film} error={error} />
                )}
                {isLoadingSessions ? (
                    <Spinner animation="grow" variant="light" />
                ) : (
                    <SessionList sessions={sessions} />
                )}
            </Container>
        </main>
    );
};

export default FilmPage;
