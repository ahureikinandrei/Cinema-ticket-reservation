import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import {
    selectOrderCost,
    selectReservedSeats,
    selectSessionId,
} from '../../redux/order/selectors';
import OrderSeat from '../../components/order/order-seat/OrderSeat';
import { getIsUserAuth, getUserEmail } from '../../redux/users/selectors';
import style from './orderPage.module.scss';
import AuthModal from '../../components/modal/auth-modal/AuthModal';
import OrderService from '../../services/order.service';
import SessionService from '../../services/session.service';
import { isString } from '../../utils/types';

const OrderPage: FC = () => {
    const [authModalState, setAuthModalState] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const selectedSeats = useAppSelector(selectReservedSeats);
    const sessionId = useAppSelector(selectSessionId);
    const isAuth = useAppSelector(getIsUserAuth);
    const orderCost = useAppSelector(selectOrderCost);
    const email = useAppSelector(getUserEmail);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedSeats.length === 0) {
            navigate('/');
        }
    });

    const buy = async (): Promise<void> => {
        if (!isAuth) {
            setAuthModalState(true);
            return;
        }

        if (!sessionId) {
            return;
        }

        setLoading(true);
        const session = await SessionService.getSessionByIdAndUpdate(
            sessionId,
            selectedSeats.length
        );

        const order = await OrderService.createOrder(
            selectedSeats,
            sessionId,
            session.data.price._id
        );

        if (isString(order)) {
            navigate(`/error`);
            return;
        }

        setLoading(false);
        navigate(`/session/${sessionId}`);
    };

    const closeModal = (): void => {
        setAuthModalState(false);
    };

    return (
        <div className={style.wrapper}>
            <AuthModal open={authModalState} closeModal={closeModal} />
            <span>{email}</span>
            <span>Order cost: {orderCost}</span>
            {selectedSeats.map(({ row, seat, _id }) => (
                <OrderSeat row={row} seat={seat} key={_id} />
            ))}
            <button
                className={style.button_buy}
                onClick={buy}
                disabled={isLoading}
            >
                {isLoading ? '...' : 'Buy'}
            </button>
        </div>
    );
};

export default OrderPage;
