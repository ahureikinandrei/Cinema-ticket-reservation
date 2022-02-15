import React, { FC } from 'react';
import style from './searchInput.module.scss';

const SearchInput: FC = () => (
    <div className="d-flex justify-content-center">
        <input className={style.searchInput} type="text" placeholder="Search" />
    </div>
);

export default SearchInput;
