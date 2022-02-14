import React, { FC } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useAction, useAppSelector } from '../../hooks/redux';
import { getUserErrorMessage } from '../../redux/users/selectors';

const Alert: FC = () => {
    const errorMessage = useAppSelector(getUserErrorMessage);
    const { setUserErrorMessage } = useAction();

    const onClose = (): void => {
        setUserErrorMessage('');
    };

    return (
        <ToastContainer position="bottom-start">
            <Toast
                onClose={onClose}
                show={!!errorMessage}
                delay={3000}
                autohide
            >
                <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Alert;
