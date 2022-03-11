import React, { FC, useState } from 'react';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import style from './profilePage.module.scss';

const ProfilePage: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(true);

    return (
        <Container as="main" className={style.wrapper}>
            {isLoading ? (
                <div className={style.loader}>
                    <Spinner animation="grow" variant="light" />
                </div>
            ) : (
                <div>123</div>
            )}
        </Container>
    );
};

export default ProfilePage;
