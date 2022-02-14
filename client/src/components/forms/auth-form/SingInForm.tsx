import React, { FC, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidationSchema } from './validationSchems';
import style from './signIn.module.scss';
import { FormTypes, FormTypesEnum } from '../../buttons/auth-button/types';
import { useSignInForm } from '../../../hooks/useSignInForm';
import { UserData } from '../../../redux/actions/types';

interface IAuthFormProps {
    closeModal: () => void;
    changeFormType: (type: FormTypes) => void;
}

type Inputs = {
    email: string;
    password: string;
};

const SingInForm: FC<IAuthFormProps> = ({ closeModal, changeFormType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(signInValidationSchema),
    });

    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, error] = useSignInForm(userData, closeModal);

    const onSubmit = (data: Inputs): void => {
        setUserData(data);
    };

    const onRegistrationClick = (): void => {
        changeFormType(FormTypesEnum.SIGN_UP);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        isInvalid={!!errors.email?.message}
                        {...register('email', { required: true })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            isInvalid={!!errors.password?.message || !!error}
                            {...register('password', { required: true })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message || error}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
                <div className="me-auto">
                    Don&apos;t have an account?
                    <span
                        role="button"
                        tabIndex={0}
                        className={style.span}
                        onClick={onRegistrationClick}
                    >
                        Register
                    </span>
                </div>
                <Button variant="primary" type="submit" disabled={loading}>
                    Submit
                </Button>
            </Modal.Footer>
        </Form>
    );
};

export default SingInForm;
