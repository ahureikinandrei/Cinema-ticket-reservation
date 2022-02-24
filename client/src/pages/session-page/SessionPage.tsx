import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SessionService from '../../services/session.service';
import { ISessionData } from '../../services/types';
import style from './sessionPage.module.scss';
import Hall from '../../components/hall/Hall';
import FilmInfo from '../../components/films/film-info/FilmInfo';
import { UNEXPECTED_ERROR } from '../../constants/messages';

const SessionPage: FC = () => {
    const { id } = useParams();
    const [session, setSession] = useState<ISessionData | null>(null);
    const [error, setError] = useState<string>('');

    const getSession = async (): Promise<void> => {
        try {
            const { data } = await SessionService.getSessionById(id);
            setSession(data);
        } catch (e) {
            if (e.response) {
                setError(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    if (!session) {
        return (
            <div className="text-light">Something Went Wrong. Try Again</div>
        );
    }

    return (
        <Container className={style.container}>
            <FilmInfo film={session.film} error={error} />
            <Hall />
        </Container>
    );
};

export default SessionPage;
