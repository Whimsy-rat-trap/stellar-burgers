import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { RootState, AppDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

type TOrderInfoData = {
  createdAt: string;
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  updatedAt: string;
  number: number;
  ingredientsInfo: TIngredientsWithCount;
  date: Date;
  total: number;
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { orders: feedOrders } = useSelector((state: RootState) => state.feed);
  const { orders: profileOrders } = useSelector(
    (state: RootState) => state.profileOrders
  );
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  // Загружаем данные если их нет
  useEffect(() => {
    if (feedOrders.length === 0) {
      dispatch(fetchFeeds());
    }
    if (profileOrders.length === 0) {
      dispatch(fetchProfileOrders());
    }
  }, [dispatch, feedOrders.length, profileOrders.length]);

  // Находим заказ по номеру
  const orderData = useMemo((): TOrder | null => {
    if (!number) return null;

    const orderNumber = parseInt(number, 10);

    // Ищем в ленте заказов
    const feedOrder = feedOrders.find((order) => order.number === orderNumber);
    if (feedOrder) return feedOrder;

    // Ищем в истории заказов
    const profileOrder = profileOrders.find(
      (order) => order.number === orderNumber
    );
    if (profileOrder) return profileOrder;

    return null;
  }, [number, feedOrders, profileOrders]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo((): TOrderInfoData | null => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
