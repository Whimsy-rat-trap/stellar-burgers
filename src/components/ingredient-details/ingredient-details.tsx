import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  setIngredient,
  clearIngredient
} from '../../services/slices/ingredientDetailsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { ingredient } = useSelector((state) => state.ingredientDetails);
  const { ingredients, loading: ingredientsLoading } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const foundIngredient = ingredients.find((item) => item._id === id);
      if (foundIngredient) {
        dispatch(setIngredient(foundIngredient));
      }
    }

    return () => {
      dispatch(clearIngredient());
    };
  }, [id, ingredients, dispatch]);

  // Показываем прелоадер только если ингредиенты еще загружаются
  if (ingredientsLoading) {
    return <Preloader />;
  }

  // Если ингредиенты загружены, но конкретный ингредиент не найден
  if (!ingredient && !ingredientsLoading) {
    return (
      <div className='text text_type_main-default pt-10'>
        Ингредиент не найден
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredient!} />;
};
