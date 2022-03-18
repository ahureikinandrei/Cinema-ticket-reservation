import React, { FC, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FilmForm from '../../components/forms/film-form/FilmForm';
import CinemaForm from '../../components/forms/cinema-form/CinemaForm';
import SessionForm from '../../components/forms/session-form/SessionForm';
import style from './adminPage.module.scss';
import HallForm from '../../components/forms/hall-form/HallForm';
import StepProgress from '../../components/progress/step-progree/StepProgress';

const labelArray = ['Film', 'Cinema', 'Hall', 'Session'];

const AdminPage: FC = () => {
    const [key, setKey] = useState('Film');

    const selectTab = (k: string | null): void => {
        if (k) {
            setKey(k);
        }
    };

    const nextStep = (): void => {
        const keyIndex = labelArray.indexOf(key);
        setKey(labelArray[keyIndex + 1]);
    };

    return (
        <Container as="main" className={style.content}>
            <StepProgress
                stepKey={key}
                setStepKey={setKey}
                labelArray={labelArray}
            />
            <div className={style.tab__content}>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={selectTab}
                    className={style.tabs}
                >
                    <Tab eventKey="Film" title="Film">
                        <FilmForm nextStep={nextStep} />
                    </Tab>
                    <Tab eventKey="Cinema" title="Cinema">
                        <CinemaForm nextStep={nextStep} />
                    </Tab>
                    <Tab eventKey="Hall" title="Hall">
                        <HallForm nextStep={nextStep} />
                    </Tab>
                    <Tab eventKey="Session" title="Session">
                        <SessionForm />
                    </Tab>
                </Tabs>
            </div>
        </Container>
    );
};

export default AdminPage;
