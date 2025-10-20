import { FC } from 'react';
import { IngredientDetails } from '@components';
import styles from './ingredient-page.module.css';

export const IngredientPage: FC = () => (
  <div className={styles.page}>
    <h1 className={`${styles.title} text text_type_main-large`}>
      Детали ингредиента
    </h1>
    <IngredientDetails />
  </div>
);
