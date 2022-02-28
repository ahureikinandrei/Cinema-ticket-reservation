import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Dropdown } from 'react-bootstrap';
import { ANY_GENRE, GENRES } from '../../../constants/filmConstants';
import { AGE_CATEGORIES } from '../../../constants/searchCategories';
import { useAction } from '../../../hooks/redux';

const CategoriesForm: FC = () => {
    const [selectedGenre, setGenreState] = useState('any');
    const [selectedAge, setAge] = useState(0);
    const [selectedRating, setRatingState] = useState(0);
    const { setAgeRating, setGenre, setRating } = useAction();

    const onCategoriesChange = (event: FormEvent): void => {
        event.preventDefault();
        setAgeRating(selectedAge);
        setRating(selectedRating);

        const genre = selectedGenre === ANY_GENRE ? '' : selectedGenre;
        setGenre(genre);
    };

    const changeRating = (event: ChangeEvent<HTMLInputElement>): void => {
        setRatingState(Number(event.target.value));
    };

    return (
        <Form onSubmit={onCategoriesChange}>
            <Form.Label className="mt-3">Genre</Form.Label>
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
            <Form.Label className="mt-3">Age</Form.Label>
            {AGE_CATEGORIES.map((age, index) => (
                <Form.Check
                    checked={selectedAge === index}
                    name="Age"
                    key={age}
                    type="radio"
                    label={age}
                    aria-label="All ages"
                    onChange={() => {
                        setAge(index);
                    }}
                />
            ))}
            <Form.Label className="mt-3">Rating</Form.Label>
            <Form.Control
                value={selectedRating}
                type="number"
                onChange={changeRating}
                placeholder="Age"
                required
                min={0}
                max={5}
                step={0.1}
            />
            <Button type="submit" className="mt-3" variant="outline-light">
                Search
            </Button>
        </Form>
    );
};

export default CategoriesForm;
