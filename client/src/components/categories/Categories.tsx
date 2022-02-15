import React, { FC } from 'react';
import style from './categories.module.scss';

const Categories: FC = () => (
    <div className={style.wrapper}>
        <div className={style.title}>
            <p className="text-light">Categories</p>
        </div>
        <div className={style.items}>
            <p className="text-light">Search category</p>
        </div>
    </div>
);

export default Categories;
