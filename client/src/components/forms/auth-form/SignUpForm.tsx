import React, { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from './validationSchems';
import style from './signIn.module.scss';
import { FormTypes, FormTypesEnum } from '../../buttons/auth-button/types';
import { useAction } from '../../../hooks/redux';

interface IAuthFormProps {
    closeModal: () => void;
    changeFormType: (type: FormTypes) => void;
}

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
};

const SingUpForm: FC<IAuthFormProps> = ({ closeModal, changeFormType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: 'test@mail.ru',
            password: 'password',
            confirmPassword: 'password',
        },
        resolver: yupResolver(signUpValidationSchema),
    });

    const { createUser } = useAction();

    const onSubmit = (data: Inputs): void => {
        createUser(data);
        closeModal();
    };

    const signInClick = (): void => {
        changeFormType(FormTypesEnum.SIGN_IN);
    };

    return (
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <Form.Group className={style.form_group}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="email"
                        isInvalid={!!errors.email?.message}
                        {...register('email', { required: true })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={style.form_group}>
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            isInvalid={!!errors.password?.message}
                            {...register('password', { required: true })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className={style.form_group}>
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            isInvalid={!!errors.confirmPassword?.message}
                            {...register('confirmPassword', {
                                required: true,
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword?.message}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
                <div className="me-auto">
                    <span
                        role="button"
                        tabIndex={0}
                        onClick={signInClick}
                        className={style.span}
                    >
                        Sign In
                    </span>
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Modal.Footer>
        </Form>
    );
};

export default SingUpForm;
