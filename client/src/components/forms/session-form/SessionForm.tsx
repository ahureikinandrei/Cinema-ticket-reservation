import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useAction } from '../../../hooks/redux';
import CinemaService from '../../../services/cinema.service';
import FilmService from '../../../services/film.service';
import SessionService from '../../../services/session.service';
import { ICinemaData, IFilm } from '../../../services/types';
import { getDateToISO, getTimeToISO } from '../../../utils/utils';
import { UNEXPECTED_ERROR } from '../../../constants/messages';

const SessionForm: FC = () => {
    const { setAppMessage } = useAction();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedFilm, setSelectedFilm] = useState<IFilm | null>(null);
    const [selectedCinema, setSelectedCinema] = useState<ICinemaData | null>(
        null
    );
    const [date, setDate] = useState<string>(getDateToISO());
    const [time, setTime] = useState<string>(getTimeToISO());

    const [films, setFilmsState] = useState<IFilm[]>([]);
    const [cinemas, setCinema] = useState<ICinemaData[]>([]);

    const createSession = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (!selectedCinema || !selectedFilm) {
            setError('Select cinema and film');
            setLoading(false);
            return;
        }

        const errorMessage = await SessionService.createSession({
            date,
            time,
            cinema: selectedCinema._id,
            film: selectedFilm._id,
        });

        if (errorMessage) {
            setError(errorMessage);
        }
        setLoading(false);
    };

    const getFilmsAndCinemaInfo = async (): Promise<void> => {
        try {
            const filmsResponse = await FilmService.getAllFilms();
            const cinemasResponse = await CinemaService.getAllCinema();
            setFilmsState(filmsResponse.data);
            setCinema(cinemasResponse.data);
        } catch (e) {
            if (e.response) {
                setAppMessage(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getFilmsAndCinemaInfo();
    }, []);

    const addDate = (event: ChangeEvent<HTMLInputElement>): void => {
        setDate(event.target.value);
    };

    const addTime = (event: ChangeEvent<HTMLInputElement>): void => {
        setTime(event.target.value);
    };

    if (isLoading) {
        return <Spinner animation="border" variant="light" />;
    }

    return (
        <Form onSubmit={createSession}>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle variant="secondary" size="sm">
                    {selectedFilm?.name || 'Film'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {films.map((film) => (
                        <Dropdown.Item
                            onClick={() => setSelectedFilm(film)}
                            key={film._id}
                        >
                            {film.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle variant="secondary" size="sm">
                    Cinema
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {cinemas.map((cinema) => (
                        <Dropdown.Item
                            onClick={() => setSelectedCinema(cinema)}
                            key={cinema._id}
                        >
                            {`${cinema.name} (${cinema.city})`}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                type="date"
                value={date}
                onChange={addDate}
                className="mt-3"
                required
            />
            <Form.Group>
                <Form.Control
                    type="time"
                    value={time}
                    onChange={addTime}
                    className="mt-3"
                    isInvalid={!!error}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-light mt-3">
                Create
            </Button>
        </Form>
    );
};

export default SessionForm;
