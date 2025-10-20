import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { orders: feedOrders } = useSelector((state) => state.feed);
  const { orders: profileOrders } = useSelector((state) => state.profileOrders);
  const { ingredients, loading: ingredientsLoading } = useSelector(
    (state) => state.ingredients
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

  // Готовим данные для отображения
  const orderInfo = useMemo(() => {
    if (!orderData) return null;

    const date = new Date(orderData.createdAt);
    const ingredientsInfo: TIngredientsWithCount = {};
    let total = 0;

    if (ingredients.length > 0) {
      orderData.ingredients.forEach((ingredientId: string) => {
        const ingredient = ingredients.find((ing) => ing._id === ingredientId);
        if (ingredient) {
          if (!ingredientsInfo[ingredientId]) {
            ingredientsInfo[ingredientId] = {
              ...ingredient,
              count: 1
            };
          } else {
            ingredientsInfo[ingredientId].count++;
          }
          total += ingredient.price;
        }
      });
    }

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || ingredientsLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
