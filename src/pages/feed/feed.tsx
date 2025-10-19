import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading: feedLoading } = useSelector((state) => state.feed);
  const { ingredients, loading: ingredientsLoading } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchFeeds());
    // Загружаем ингредиенты если их нет
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  // Показываем прелоадер только если загружаются И заказы И ингредиенты
  if ((feedLoading && orders.length === 0) || ingredientsLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
