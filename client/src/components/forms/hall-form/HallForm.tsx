import React, { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
import { SEAT_TYPES } from '../../../constants/filmConstants';
import { SeatModel } from '../../../models/SeatModel';
import HallGreed from '../../hall/hall-greed/HallGreed';
import { ICreateSeat } from '../../../services/types';
import HallService from '../../../services/hall.service';
import style from './hallForm.module.scss';

const HallForm: FC = () => {
    const greedData = useRef(1);
    const [error, setError] = useState('');
    const [greed, setGreed] = useState<Array<ICreateSeat[]>>([]);
    const [seatType, setSeatType] = useState<string>(SEAT_TYPES[0]);
    const [row, setRow] = useState<number>(1);
    const [seatNumber, setSeatNumber] = useState<number>(1);
    const [name, setName] = useState<string>('');

    const createHall = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const errorMessage = await HallService.createHall({
            name,
            schema: greed,
            rowSize: greedData.current,
        });

        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError('');
        setGreed([]);
    };

    const addSeat = (): void => {
        const indexSeatType = SEAT_TYPES.indexOf(seatType);
        const rowData = greed[row - 1];
        if (!rowData) {
            return;
        }

        const seat = new SeatModel(indexSeatType);
        const { size } = seat;
        const newRow = [...rowData];
        newRow.splice(seatNumber - 1, size, seat);

        const newGreedData = [...greed];
        newGreedData[row - 1] = newRow;

        setError('');
        setGreed(newGreedData);
    };

    const changeRow = (event: ChangeEvent<HTMLInputElement>): void => {
        setRow(+event.target.value);
    };

    const changeSeatNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        setSeatNumber(+event.target.value);
    };

    const addGreed = (): void => {
        greedData.current = row;
        const newHallData: Array<ICreateSeat[]> = [];
        for (let i = 0; i < row; i += 1) {
            const newRow: ICreateSeat[] = [];
            for (let k = 0; k < seatNumber; k += 1) {
                newRow.push(new SeatModel(3));
            }
            newHallData.push(newRow);
        }
        setGreed(newHallData);
    };

    const addName = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    return (
        <div className={style.hall__wrapper}>
            <Form onSubmit={createHall} className="mb-3">
                <Form.Control
                    value={name}
                    onChange={addName}
                    className="mt-3"
                    placeholder="Name"
                    required
                />
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle variant="secondary" size="sm">
                        {seatType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {SEAT_TYPES.map((type) => (
                            <Dropdown.Item
                                onClick={() => setSeatType(type)}
                                key={type}
                            >
                                {type}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Group className="text-light">
                    <Form.Label>Row</Form.Label>
                    <Form.Control
                        value={row}
                        type="number"
                        onChange={changeRow}
                        placeholder="Row"
                        required
                        min={1}
                        max={20}
                    />
                </Form.Group>
                <Form.Group className="text-light mb-1">
                    <Form.Label>Seat Number</Form.Label>
                    <Form.Control
                        value={seatNumber}
                        type="number"
                        onChange={changeSeatNumber}
                        placeholder="Seat"
                        required
                        min={1}
                        max={20}
                        isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </Form.Group>
                <ButtonGroup>
                    <Button
                        type="button"
                        variant="outline-light"
                        onClick={addSeat}
                    >
                        Add
                    </Button>
                    <Button
                        type="button"
                        variant="outline-light"
                        onClick={addGreed}
                    >
                        Greed
                    </Button>
                    <Button type="submit" variant="outline-light">
                        Create
                    </Button>
                </ButtonGroup>
            </Form>
            <HallGreed greed={greed} greedWidth={greedData.current} />
        </div>
    );
};

export default HallForm;
