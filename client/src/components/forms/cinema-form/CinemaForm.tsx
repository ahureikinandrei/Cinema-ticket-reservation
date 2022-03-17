import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { useAction } from '../../../hooks/redux';
import CinemaService from '../../../services/cinema.service';

interface ICinemaFormProps {
    nextStep: () => void;
}

const CinemaForm: FC<ICinemaFormProps> = ({ nextStep }) => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const { setAppMessage } = useAction();

    const addName = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const addCity = (event: ChangeEvent<HTMLInputElement>): void => {
        setCity(event.target.value);
    };

    const createCinema = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        const errorMessage = await CinemaService.createCinema({
            name,
            city,
        });

        if (errorMessage) {
            setAppMessage(errorMessage);
            return;
        }

        setName('');
        setCity('');
    };

    return (
        <Form onSubmit={createCinema}>
            <Form.Control
                value={name}
                onChange={addName}
                className="mt-3"
                placeholder="Cinema name"
                required
            />
            <Form.Control
                value={city}
                onChange={addCity}
                className="mt-3"
                placeholder="City"
                required
            />
            <ButtonGroup>
                <Button type="submit" variant="outline-light mt-3">
                    Create
                </Button>
                <Button
                    type="button"
                    variant="outline-light mt-3"
                    onClick={nextStep}
                >
                    Next
                </Button>
            </ButtonGroup>
        </Form>
    );
};

export default CinemaForm;
