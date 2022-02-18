import React, { FC, FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Dropdown } from 'react-bootstrap';
import { genres } from '../../../constants/filmConstants';
import { ageCategories } from '../../../constants/searchCategories';
import { useAction } from '../../../hooks/redux';

const CategoriesForm: FC = () => {
    const [selectedGenre, setGenreState] = useState('Add genre');
    const [selectedAge, setAge] = useState(0);
    const { setAgeRating, setGenre } = useAction();

    const onCategoriesChange = (event: FormEvent): void => {
        event.preventDefault();
        setAgeRating(selectedAge);
        setGenre(selectedGenre);
    };

    return (
        <Form onSubmit={onCategoriesChange}>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle variant="secondary" size="sm">
                    {selectedGenre || 'Genre'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {genres.map((genre) => (
                        <Dropdown.Item
                            onClick={() => setGenreState(genre)}
                            key={genre}
                        >
                            {genre}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Label>Age</Form.Label>
            {ageCategories.map((age, index) => (
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
            <Button type="submit" className="mt-3" variant="outline-light">
                Search
            </Button>
        </Form>
    );
};

export default CategoriesForm;
