import { FC, memo } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { useSelector } from '../../services/store';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  if (!orders || orders.length === 0) {
    return <div className='text text_type_main-default'>Заказов пока нет</div>;
  }

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
