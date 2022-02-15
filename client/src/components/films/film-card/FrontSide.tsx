import React, { FC } from 'react';
import { Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import style from './filmCard.module.scss';

const defaultImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';

const FrontSide: FC = () => {
    return (
        <div className={style.front}>
            <div className={style.image}>
                <Image width="100%" height="100%" src={defaultImage} />
            </div>
            <div className={style.description}>
                Samsung...
                <Rating
                    initialValue={4}
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
