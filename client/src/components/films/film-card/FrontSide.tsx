import React, { FC } from 'react';
import { Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import style from './filmCard.module.scss';

interface IFrontSideProps {
    name: string;
    rating: string;
    img: string;
}

const FrontSide: FC<IFrontSideProps> = ({ name, rating, img }) => {
    return (
        <div className={style.front}>
            <div className={style.image}>
                <Image width={160} height={240} src={img} />
            </div>
            <div className={style.description}>
                <div className={style.name}>{name}</div>
                <Rating
                    initialValue={+rating}
                    ratingValue={0}
                    fillColor="gold"
                    size={20}
                    readonly
                />
            </div>
        </div>
    );
};

export default FrontSide;
