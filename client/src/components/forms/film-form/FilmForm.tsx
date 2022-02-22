import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';
import { genres } from '../../../constants/filmConstants';
import FilmService from '../../../services/film.service';
import { useAction } from '../../../hooks/redux';
import style from './createFilmForm.module.scss';

const FilmForm: FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedGenre, setGenre] = useState('Add genre');
    const [age, setAge] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [file, setFile] = useState<string | Blob>('');
    const [rating, setRating] = useState<string>('');

    const { setAppMessage } = useAction();

    const addName = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const addDescription = (event: ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value);
    };

    const addAge = (event: ChangeEvent<HTMLInputElement>): void => {
        setAge(event.target.value);
    };

    const addStartDate = (event: ChangeEvent<HTMLInputElement>): void => {
        setStartDate(event.target.value);
    };

    const addEndDate = (event: ChangeEvent<HTMLInputElement>): void => {
        setEndDate(event.target.value);
    };

    const addRating = (event: ChangeEvent<HTMLInputElement>): void => {
        setRating(event.target.value);
    };

    const selectFile = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.target || !event.target.files) {
            return;
        }

        setFile(event.target?.files[0] || '');
    };

    const createFilm = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('genre', selectedGenre);
        formData.append('age', age);
        formData.append('img', file);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('rating', rating);
        const errorMessage = await FilmService.createFilm(formData);

        if (!errorMessage) {
            setAppMessage('Film has been created');
            setName('');
            setDescription('');
            setGenre('');
            setStartDate('');
            setEndDate('');
            setRating('');
            return;
        }
        setAppMessage(errorMessage);
    };

    return (
        <Form onSubmit={createFilm}>
            <Form.Control
                value={name}
                onChange={addName}
                className="mt-3"
                placeholder="Name"
                required
            />
            <Form.Control
                value={description}
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
                    {selectedGenre || 'Add genre'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {genres.map((genre) => (
                        <Dropdown.Item
                            onClick={() => setGenre(genre)}
                            key={genre}
                        >
                            {genre}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                value={age}
                type="number"
                onChange={addAge}
                className="mt-3"
                placeholder="Age"
                required
            />
            <Form.Control
                type="date"
                value={startDate}
                onChange={addStartDate}
                className="mt-3"
                required
            />
            <Form.Control
                type="date"
                value={endDate}
                onChange={addEndDate}
                className="mt-3"
                required
            />
            <Form.Control
                value={rating}
                onChange={addRating}
                className="mt-3"
                placeholder="Rating"
                required
            />
            <Button type="submit" variant="outline-light mt-3">
                Create
            </Button>
        </Form>
    );
};

export default FilmForm;
