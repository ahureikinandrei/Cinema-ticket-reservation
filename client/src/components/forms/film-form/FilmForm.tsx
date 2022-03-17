import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Form, Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { GENRES } from '../../../constants/filmConstants';
import FilmService from '../../../services/film.service';
import { useAction } from '../../../hooks/redux';
import { Action } from './reducer';
import style from './createFilmForm.module.scss';
import { useFilmReducer } from './useFilmReducer';

interface IFilmFormProps {
    nextStep: () => void;
}

const FilmForm: FC<IFilmFormProps> = ({ nextStep }) => {
    const [file, setFile] = useState<string | Blob>('');
    const [state, customDispatch] = useFilmReducer();
    const { setAppMessage } = useAction();

    const addName = (event: ChangeEvent<HTMLInputElement>): void => {
        customDispatch(Action.NAME, event.target.value);
    };

    const addDescription = (event: ChangeEvent<HTMLInputElement>): void => {
        customDispatch(Action.DESCRIPTION, event.target.value);
    };

    const addAge = (event: ChangeEvent<HTMLInputElement>): void => {
        customDispatch(Action.AGE, event.target.value);
    };

    const addStartDate = (event: ChangeEvent<HTMLInputElement>): void => {
        customDispatch(Action.START_DATE, event.target.value);
    };

    const addEndDate = (event: ChangeEvent<HTMLInputElement>): void => {
        customDispatch(Action.END_DATE, event.target.value);
    };

    const addRating = (event: ChangeEvent<HTMLInputElement>): void => {
        customDispatch(Action.RATING, event.target.value);
    };

    const selectFile = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.target || !event.target.files) {
            return;
        }

        setFile(event.target?.files[0] || '');
    };

    const createFilm = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('description', state.description);
        formData.append('genre', state.selectedGenre);
        formData.append('age', state.age);
        formData.append('img', file);
        formData.append('startDate', state.startDate);
        formData.append('endDate', state.endDate);
        formData.append('rating', state.rating);
        const errorMessage = await FilmService.createFilm(formData);

        if (!errorMessage) {
            setAppMessage('Film has been created');
            customDispatch(Action.DEFAULT);
            return;
        }
        setAppMessage(errorMessage);
    };

    return (
        <Form onSubmit={createFilm}>
            <Form.Control
                value={state.name}
                onChange={addName}
                className="mt-3"
                placeholder="Name"
                required
            />
            <Form.Control
                value={state.description}
                onChange={addDescription}
                className="mt-3"
                placeholder="Description"
                required
            />
            <label htmlFor="file-upload" className={style.label__upload}>
                Upload image
                <input
                    id="file-upload"
                    className={style.input__upload}
                    accept=".jpg"
                    type="file"
                    onChange={selectFile}
                />
            </label>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle variant="secondary" size="sm">
                    {state.selectedGenre || 'Add genre'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {GENRES.map((genre) => (
                        <Dropdown.Item
                            // onClick={() => setGenre(genre)}
                            key={genre}
                        >
                            {genre}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                value={state.age}
                type="number"
                onChange={addAge}
                className="mt-3"
                placeholder="Age"
                required
            />
            <Form.Group className="mt-1">
                <Form.Label>Start date</Form.Label>
                <Form.Control
                    type="date"
                    value={state.startDate}
                    onChange={addStartDate}
                    max={state.endDate}
                    required
                />
            </Form.Group>
            <Form.Group className="mt-1">
                <Form.Label>End date</Form.Label>
                <Form.Control
                    type="date"
                    value={state.endDate}
                    onChange={addEndDate}
                    min={state.startDate}
                    required
                />
            </Form.Group>
            <Form.Control
                value={state.rating}
                onChange={addRating}
                className="mt-3"
                placeholder="Rating"
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

export default FilmForm;
