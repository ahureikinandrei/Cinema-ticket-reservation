import React, { FC, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import style from './adminPage.module.scss';
import FilmForm from '../../components/forms/film-form/FilmForm';
import CinemaForm from '../../components/forms/cinema-form/CinemaForm';
import SessionForm from '../../components/forms/session-form/SessionForm';

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
                    <Card className={style.create_card} bg="dark">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={selectTab}
                            className={style.tabs}
                        >
                            <Tab
                                eventKey="film"
                                title="Film"
                                className={style.tab}
                            >
                                <FilmForm />
                            </Tab>
                            <Tab eventKey="cinema" title="Cinema">
                                <CinemaForm />
                            </Tab>
                            <Tab eventKey="session" title="Session">
                                <SessionForm />
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
            </Container>
        </main>
    );
};

export default AdminPage;
