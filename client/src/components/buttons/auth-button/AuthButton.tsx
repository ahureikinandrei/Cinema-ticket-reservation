import React, { FC, useState } from 'react';
import Button from 'react-bootstrap/button';
import { useAction, useAppSelector } from '../../../hooks/redux';
import AuthModal from '../../modal/auth-modal/AuthModal';
import {
    getIsUserAuth,
    getIsUserLoading,
} from '../../../redux/users/selectors';

const AuthButton: FC = () => {
    const isAuth = useAppSelector(getIsUserAuth);
    const isLoading = useAppSelector(getIsUserLoading);
    const [isModalOpen, setModalState] = useState(false);
    const { userDefaultState } = useAction();

    const openModal = (): void => {
        setModalState(true);
    };

    const closeModal = (): void => {
        setModalState(false);
    };

    const onLogoutClick = (): void => {
        userDefaultState();
    };

    return (
        <div>
            {isAuth ? (
                <Button variant="outline-light" onClick={onLogoutClick}>
                    Logout
                </Button>
            ) : (
                <Button
                    disabled={isLoading}
                    variant="outline-light"
                    onClick={openModal}
                >
                    Sign In
                </Button>
            )}

            <AuthModal open={isModalOpen} closeModal={closeModal} />
        </div>
    );
};

export default AuthButton;
