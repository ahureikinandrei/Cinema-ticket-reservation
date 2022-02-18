import React, { FC } from 'react';
import style from './categories.module.scss';
import CategoriesForm from '../forms/categories-form/CategoriesForm';

const Categories: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <p className="text-light">Categories</p>
            </div>
            <div className={style.items}>
                <p className="text-light">Search category</p> <CategoriesForm />
            </div>
        </div>
    );
};

export default Categories;
