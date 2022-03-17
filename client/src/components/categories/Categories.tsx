import React, { FC } from 'react';
import CategoriesForm from '../forms/categories-form/CategoriesForm';
import style from './categories.module.scss';

const Categories: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <p className="text-light">Search category</p>
            </div>
            <div className={style.items}>
                <CategoriesForm />
            </div>
        </div>
    );
};

export default Categories;
