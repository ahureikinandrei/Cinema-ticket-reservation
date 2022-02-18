import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import style from './searchInput.module.scss';
import useDebounce from '../../../hooks/useDebounce';
import { useAction } from '../../../hooks/redux';

const SearchInput: FC = () => {
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);
    const { setSearchValue } = useAction();

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    useEffect(() => {
        setSearchValue(debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="d-flex justify-content-center">
            <input
                className={style.searchInput}
                type="text"
                placeholder="Search"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
export default SearchInput;
