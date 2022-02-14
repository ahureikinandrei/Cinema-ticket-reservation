import React, { FC, useState, ReactElement, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormTypes, FormTypesEnum } from '../../buttons/auth-button/types';
import SingInForm from '../../forms/auth-form/SingInForm';
import SingUpForm from '../../forms/auth-form/SignUpForm';

interface IAuthModalProps {
    open: boolean;
    closeModal: () => void;
}

const AuthModal: FC<IAuthModalProps> = ({ open, closeModal }) => {
    const [formType, setFormType] = useState<FormTypes>(FormTypesEnum.SIGN_IN);

    useEffect(() => {
        if (!open) {
            setFormType(FormTypesEnum.SIGN_IN);
        }
    }, [open]);

    const renderFormByType = (): ReactElement => {
        if (formType === FormTypesEnum.SIGN_IN) {
            return (
                <SingInForm
                    closeModal={closeModal}
                    changeFormType={setFormType}
                />
            );
        }
        return (
            <SingUpForm closeModal={closeModal} changeFormType={setFormType} />
        );
    };

    return (
        <Modal show={open} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{formType}</Modal.Title>
            </Modal.Header>
            {renderFormByType()}
        </Modal>
    );
};

export default AuthModal;
