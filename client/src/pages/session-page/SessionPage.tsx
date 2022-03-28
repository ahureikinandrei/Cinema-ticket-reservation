import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import SessionService from '../../services/session.service';
import { ISessionData } from '../../services/types';
import Hall from '../../components/hall/Hall';
import FilmInfo from '../../components/films/film-info/FilmInfo';
import HallLegend from '../../components/hall/hall-legend/HallLegend';
import { UNEXPECTED_ERROR } from '../../constants/messages';
import { useAction, useAppSelector } from '../../hooks/redux';
import { selectOrderCost } from '../../redux/order/selectors';
import {
    SeatSocketsService,
    SeatsSocketEvents,
} from '../../services/seatSockets.service';
import style from './sessionPage.module.scss';

const SessionPage: FC = () => {
    const [bookedOtherUsersSeatsID, setBookedOtherUsersSeatsID] = useState<
        string[]
    >([]);
    const socketService = useRef<SeatSocketsService>();
    const { id } = useParams();
    const [session, setSession] = useState<ISessionData | null>(null);
    const [error, setError] = useState<string>('');
    const orderCost = useAppSelector(selectOrderCost);

    const { setDefaultOrderState, setSessionId } = useAction();
    const navigate = useNavigate();

    const redirectToButPage = (): void => {
        socketService.current?.disconnect(
            SeatsSocketEvents.REDIRECT_ON_BYE_PAGE
        );
        navigate('/order');
    };

    const setSocketConnection = (sessionId: string): void => {
        socketService.current = new SeatSocketsService(sessionId);
        socketService.current.listenMessageFromServer(
            setBookedOtherUsersSeatsID
        );
    };

    const getSession = async (): Promise<void> => {
        setDefaultOrderState();
        try {
            const { data } = await SessionService.getSessionById(id);
            setSessionId(data._id);
            setSocketConnection(data._id);
            setSession(data);
        } catch (e) {
            if (e.response) {
                setError(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
    };

    useEffect(() => {
        getSession();
        return () => {
            socketService.current?.disconnect(SeatsSocketEvents.LEAVE_SESSION);
        };
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
                    <div className={style.hall}>
                        <Hall
                            hallData={session.price.seatsStatus}
                            greedWidth={session.price.rowSize}
                            seatPrise={session.price.seatPrice}
                            bookedOtherUsersSeatsID={bookedOtherUsersSeatsID}
                            socket={socketService.current}
                        />
                        <HallLegend
                            seatPrise={session.price.seatPrice}
                            orderCost={orderCost}
                            redirectToButPage={redirectToButPage}
                        />
                    </div>
                </>
            ) : (
                <Spinner animation="grow" variant="light" />
            )}
        </Container>
    );
};

export default SessionPage;
