import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { ISessionData } from '../../../services/types';

interface ISessionListProps {
    sessions: ISessionData[];
}

const SessionList: FC<ISessionListProps> = ({ sessions }) => {
    return (
        <ListGroup className="mt-auto w-100 mb-3">
            {sessions.map((session) => {
                const { date, time, _id, cinema } = session;
                const { name, city } = cinema;

                return (
                    <ListGroup.Item
                        key={_id}
                        as={Link}
                        to={`/session/${_id}`}
                        replace
                    >
                        {date} {time} City: {city} Cinema: {name}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
};

export default SessionList;
