import React, { ReactElement } from 'react';
import { IOrderResponse } from '../../../services/types';
import OrderInfo from '../order-info/OrderInfo';

const OrderList = (orders: IOrderResponse[]): ReactElement[] | ReactElement => {
    if (orders.length === 0) {
        return <div>You have no orders yet</div>;
    }

    return orders.map((order) => {
        const { _id, session, seats } = order;
        const { film, date, time } = session;

        return (
            <OrderInfo
                key={_id}
                film={film}
                seats={seats}
                date={date}
                time={time}
            />
        );
    });
};

export default OrderList;
