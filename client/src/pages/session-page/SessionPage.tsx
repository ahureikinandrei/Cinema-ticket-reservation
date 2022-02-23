import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SessionService from '../../services/session.service';
import { ISessionData } from '../../services/types';

const SessionPage: FC = () => {
    const { id } = useParams();
    const [session, setSession] = useState<ISessionData | null>(null);

    const getSession = async (): Promise<void> => {
        try {
            const { data } = await SessionService.getSessionById(id);
            setSession(data);
        } catch (e) {
            console.log(e);
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

    return <div>{id}</div>;
};

export default SessionPage;
