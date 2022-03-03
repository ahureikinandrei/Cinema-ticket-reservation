import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import SessionService from '../../services/session.service';
import { ISessionData } from '../../services/types';
import Hall from '../../components/hall/Hall';
import FilmInfo from '../../components/films/film-info/FilmInfo';
import { UNEXPECTED_ERROR } from '../../constants/messages';
import style from './sessionPage.module.scss';

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

    if (error) {
        return (
            <div className="text-light">Something Went Wrong. Try Again</div>
        );
    }

    return (
        <Container className={style.container}>
            {session ? (
                <>
                    <FilmInfo film={session.film} error={error} />
                    <Hall
                        hallData={session.price.seatsStatus}
                        greedWidth={session.price.rowSize}
                    />
                </>
            ) : (
                <Spinner animation="grow" variant="light" />
            )}
        </Container>
    );
};

export default SessionPage;
