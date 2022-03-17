import React, { FC } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useAlert } from './useAlert';

const Alert: FC = () => {
    const [show, message, onClose] = useAlert();

    return (
        <ToastContainer position="bottom-start" className="mb-3">
            <Toast onClose={onClose} show={show} delay={3000} autohide>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Alert;
