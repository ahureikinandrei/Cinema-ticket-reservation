import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Dropdown } from 'react-bootstrap';
import { ANY_GENRE, GENRES } from '../../../constants/filmConstants';
import { useAction } from '../../../hooks/redux';
import style from './categoriseForm.module.scss';

const CategoriesForm: FC = () => {
    const [selectedGenre, setGenreState] = useState('any');
    const [selectedRating, setRatingState] = useState(0);
    const [selectedCity, setCityState] = useState('');
    const [selectedCinema, setCinemaState] = useState('');
    const { setGenre, setRating, setCity, setCinema } = useAction();

    const onCategoriesChange = (event: FormEvent): void => {
        event.preventDefault();

        setCity(selectedCity.trim());
        setRating(selectedRating);
        setCinema(selectedCinema.trim());

        const genre = selectedGenre === ANY_GENRE ? '' : selectedGenre;
        setGenre(genre);
    };

    const changeRating = (event: ChangeEvent<HTMLInputElement>): void => {
        setRatingState(Number(event.target.value));
    };

    const changeCity = (event: ChangeEvent<HTMLInputElement>): void => {
        setCityState(event.target.value);
    };

    const changeCinema = (event: ChangeEvent<HTMLInputElement>): void => {
        setCinemaState(event.target.value);
    };

    return (
        <Form onSubmit={onCategoriesChange}>
            <Form.Group className={style.category__item}>
                <Form.Label>City</Form.Label>
                <Form.Control value={selectedCity} onChange={changeCity} />
            </Form.Group>
            <Form.Group className={style.category__item}>
                <Form.Label>Cinema</Form.Label>
                <Form.Control value={selectedCinema} onChange={changeCinema} />
            </Form.Group>
            <Form.Label className={style.category__item}>Genre</Form.Label>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" size="sm">
                    {selectedGenre || 'Genre'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {GENRES.map((genre) => (
                        <Dropdown.Item
                            onClick={() => setGenreState(genre)}
                            key={genre}
                        >
                            {genre}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Group className={style.category__rating}>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                    value={selectedRating}
                    type="number"
                    onChange={changeRating}
                    required
                    min={0}
                    max={5}
                    step={0.1}
                    size="sm"
                />
            </Form.Group>
            <Button type="submit" className="mt-3" variant="outline-light">
                Search
            </Button>
        </Form>
    );
};

export default CategoriesForm;
