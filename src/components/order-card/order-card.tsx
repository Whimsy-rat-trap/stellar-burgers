import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '@ui';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const orderInfo = useMemo(() => {
    const ingredientsInfo: TIngredient[] = [];
    let total = 0;

    // Всегда пытаемся вычислить данные, даже если ингредиенты еще загружаются
    order.ingredients.forEach((ingredientId: string) => {
      const ingredient = ingredients.find((ing) => ing._id === ingredientId);
      if (ingredient) {
        ingredientsInfo.push(ingredient);
        total += ingredient.price;
      }
    });

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remains = Math.max(0, ingredientsInfo.length - maxIngredients);
    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]); // Зависимость от ingredients гарантирует пересчет при их загрузке

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
