import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useAction } from '../../../hooks/redux';
import CinemaService from '../../../services/cinema.service';
import FilmService from '../../../services/film.service';
import SessionService from '../../../services/session.service';
import { ICinemaData, IFilm, IHallData } from '../../../services/types';
import { getDateToISO, getTimeToISO } from '../../../utils/utils';
import { UNEXPECTED_ERROR } from '../../../constants/messages';
import HallService from '../../../services/hall.service';
import PriceService from '../../../services/price.service';
import { SeatsTypes } from '../../hall/seats-types';
import style from './sessionForm.module.scss';

const SessionForm: FC = () => {
    const { setAppMessage } = useAction();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedFilm, setSelectedFilm] = useState<IFilm | null>(null);
    const [selectedHall, setSelectedHall] = useState<IHallData | null>(null);
    const [selectedCinema, setSelectedCinema] = useState<ICinemaData | null>(
        null
    );
    const [date, setDate] = useState<string>(getDateToISO());
    const [time, setTime] = useState<string>(getTimeToISO());

    const [films, setFilmsState] = useState<IFilm[]>([]);
    const [cinemas, setCinema] = useState<ICinemaData[]>([]);
    const [halls, setHalls] = useState<IHallData[]>([]);
    const [simpleSeatPrice, setSimpleSeatPrice] = useState<number>(1);
    const [loveSeatPrice, setLoveSeatPrice] = useState<number>(2);
    const [primeSeatPrice, setPrimeSeatPrice] = useState<number>(2);

    const createSession = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (!selectedCinema || !selectedFilm || !selectedHall) {
            setError('All fields must be filled');
            setLoading(false);
            return;
        }

        const freeSeats = selectedHall.schema.reduce<number>((seats, row) => {
            let freeSeatsInRow = 0;
            row.forEach((seat) => {
                if (seat.type !== SeatsTypes.empty) {
                    freeSeatsInRow += 1;
                }
            });
            return seats + freeSeatsInRow;
        }, 0);

        const priceDocumentId = await PriceService.createPrice({
            seatPrice: {
                simple: simpleSeatPrice,
                love: loveSeatPrice,
                prime: primeSeatPrice,
            },
            seatsStatus: selectedHall.schema,
            rowSize: selectedHall.rowSize,
        });

        if (!priceDocumentId) {
            setError(UNEXPECTED_ERROR);
            setLoading(false);
            return;
        }

        const errorMessage = await SessionService.createSession({
            date,
            time,
            cinema: selectedCinema._id,
            film: selectedFilm._id,
            price: priceDocumentId,
            freeSeats,
        });

        if (errorMessage) {
            setError(errorMessage);
        }
        setLoading(false);
    };

    const getFilmsInfo = async (): Promise<void> => {
        try {
            const filmsResponse = await FilmService.getAllFilms();
            const cinemasResponse = await CinemaService.getAllCinema();
            const hallsResponse = await HallService.getAllHalls();

            setFilmsState(filmsResponse.data);
            setCinema(cinemasResponse.data);
            setHalls(hallsResponse.data);
        } catch (e) {
            if (e.response) {
                setAppMessage(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getFilmsInfo();
    }, []);

    const addDate = (event: ChangeEvent<HTMLInputElement>): void => {
        setDate(event.target.value);
    };

    const addTime = (event: ChangeEvent<HTMLInputElement>): void => {
        setTime(event.target.value);
    };

    const changeSimplePrice = (event: ChangeEvent<HTMLInputElement>): void => {
        setSimpleSeatPrice(+event.target.value);
    };

    const changeLovePrice = (event: ChangeEvent<HTMLInputElement>): void => {
        setLoveSeatPrice(+event.target.value);
    };

    const changePrimePrice = (event: ChangeEvent<HTMLInputElement>): void => {
        setPrimeSeatPrice(+event.target.value);
    };

    if (isLoading) {
        return <Spinner animation="border" variant="light" />;
    }

    return (
        <Form onSubmit={createSession}>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle
                    variant="secondary"
                    size="sm"
                    className={style.dropdown__button}
                >
                    <p className={style.dropdown__text}>
                        {selectedFilm?.name || 'Film'}
                    </p>
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
                <Dropdown.Toggle
                    variant="secondary"
                    size="sm"
                    className={style.dropdown__button}
                >
                    <p className={style.dropdown__text}>
                        {selectedCinema?.name || 'Cinema'}
                    </p>
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
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle
                    variant="secondary"
                    size="sm"
                    className={style.dropdown__button}
                >
                    <p className={style.dropdown__text}>
                        {selectedHall?.name || 'Hall'}
                    </p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {halls.map((hall) => (
                        <Dropdown.Item
                            onClick={() => setSelectedHall(hall)}
                            key={hall._id}
                        >
                            {hall.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Group className="mt-3 text-light">
                <Form.Label>Simple seat price</Form.Label>
                <Form.Control
                    type="number"
                    step="0.1"
                    onChange={changeSimplePrice}
                    value={simpleSeatPrice}
                    required
                />
            </Form.Group>
            <Form.Group className="text-light">
                <Form.Label>Love seat price</Form.Label>
                <Form.Control
                    type="number"
                    step="0.1"
                    onChange={changeLovePrice}
                    value={loveSeatPrice}
                    required
                />
            </Form.Group>
            <Form.Group className="text-light">
                <Form.Label>Prime seat price</Form.Label>
                <Form.Control
                    type="number"
                    step="0.1"
                    onChange={changePrimePrice}
                    value={primeSeatPrice}
                    required
                />
            </Form.Group>
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
