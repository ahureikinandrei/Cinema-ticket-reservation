import React, { FC, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FilmForm from '../../components/forms/film-form/FilmForm';
import CinemaForm from '../../components/forms/cinema-form/CinemaForm';
import SessionForm from '../../components/forms/session-form/SessionForm';
import style from './adminPage.module.scss';
import HallForm from '../../components/forms/hall-form/HallForm';

const AdminPage: FC = () => {
    const [key, setKey] = useState('film');

    const selectTab = (k: string | null): void => {
        if (k) {
            setKey(k);
        }
    };

    return (
        <main className={style.content}>
            <Container className="d-flex flex-grow-1 justify-content-center">
                <div className={style.wrapper}>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={selectTab}
                    >
                        <Tab eventKey="film" title="Film">
                            <FilmForm />
                        </Tab>
                        <Tab eventKey="cinema" title="Cinema">
                            <CinemaForm />
                        </Tab>
                        <Tab eventKey="session" title="Session">
                            <SessionForm />
                        </Tab>
                        <Tab eventKey="hall" title="Hall">
                            <HallForm />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </main>
    );
};

export default AdminPage;
