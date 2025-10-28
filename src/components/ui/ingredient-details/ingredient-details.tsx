import React, { FC } from 'react';
import styles from './ingredient-details.module.css';
import { TIngredient } from '@utils-types';

type TIngredientDetailsUIProps = {
  ingredientData: TIngredient;
};

export const IngredientDetailsUI: FC<TIngredientDetailsUIProps> = ({
  ingredientData
}) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredientData;

  return (
    <div className={styles.content}>
      <img src={image_large} alt={name} />
      <p className='text text_type_main-medium mt-4 mb-8'>{name}</p>
      <ul className={styles.nutritional_values}>
        <li className={styles.nutritional_value}>
          <span className='text text_type_main-default text_color_inactive'>
            Калории,ккал
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {calories}
          </span>
        </li>
        <li className={styles.nutritional_value}>
          <span className='text text_type_main-default text_color_inactive'>
            Белки,г
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {proteins}
          </span>
        </li>
        <li className={styles.nutritional_value}>
          <span className='text text_type_main-default text_color_inactive'>
            Жиры,г
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {fat}
          </span>
        </li>
        <li className={styles.nutritional_value}>
          <span className='text text_type_main-default text_color_inactive'>
            Углеводы,г
          </span>
          <span className='text text_type_digits-default text_color_inactive'>
            {carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};
