import React, { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import UserService from '../../services/user.service';
import { IOrderResponse } from '../../services/types';
import OrderList from '../../components/order/order-list/OrderList';
import { useAppSelector } from '../../hooks/redux';
import { getUserEmail } from '../../redux/users/selectors';
import style from './profilePage.module.scss';
import { isString } from '../../utils/types';
import { IUser } from '../../models/IUser';

const ProfilePage: FC = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<IOrderResponse[]>([]);
    const userEmail = useAppSelector(getUserEmail);

    const getUser = async (): Promise<void> => {
        const response = await UserService.getUser(id);

        if (isString(response)) {
            setLoading(false);
            return;
        }

        setOrders((response as IUser).orders);
        setLoading(false);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Container as="main" className={style.wrapper}>
            {isLoading ? (
                <div className={style.loader}>
                    <Spinner animation="grow" variant="light" />
                </div>
            ) : (
                <div className={style.orders}>
                    <span>{userEmail}</span>
                    <div className={style.orders__list}>
                        {OrderList(orders)}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ProfilePage;
