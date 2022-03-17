import React, { FC } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ISessionData } from '../../../services/types';
import style from './sessionList.module.scss';

interface ISessionListProps {
    sessions: ISessionData[];
}

const SessionList: FC<ISessionListProps> = ({ sessions }) => {
    if (!sessions || sessions.length === 0) {
        return <div className={style.session__error}>Coming Soon</div>;
    }
    return (
        <Row xs={2} md={4} lg={5} className="w-100">
            {sessions.map((session) => {
                const { date, time, _id, cinema } = session;
                const { name, city } = cinema;

                return (
                    <Col
                        key={_id}
                        as={Link}
                        to={`/session/${_id}`}
                        className={style.session}
                    >
                        <div className={style.session__body}>
                            <span>{date}</span>
                            <span>{time}</span>
                            <span>City: {city}</span>
                            <span>Cinema: {name}</span>
                        </div>
                    </Col>
                );
            })}
        </Row>
    );
};

export default SessionList;
