import React, {useEffect, useState, FC} from 'react';
import styles from "./order-ingredients-image.module.css";
import {TIngredient, TIngredients} from '../../services/types/ingredientTypes';

const OrderIngredientsImage: FC<TIngredients<TIngredient>> = ({ingredients}) => {
  const [countIngredients, setCountIngredients] = useState(0);
  const [listIngredients, setListIngredients] = useState<TIngredient[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (ingredients) {
      setIsLoaded(true);
      if (ingredients.length > 6) {
        setCountIngredients(ingredients.length - 6);
        setListIngredients(ingredients.slice(0, 6));
      } else {
        setListIngredients(ingredients);
      }
    }
  }, [ingredients]);
  return (
    isLoaded
    ? <div className={styles.icons}>
        {/* eslint-disable-next-line array-callback-return */}
      {listIngredients.map((ingredient, index) => {
        if (index === 0) {
          return (
            <img key={index} className={`${styles.icon} ${styles.icon_1}`}
                 src={ingredient.image_mobile} alt={ingredient.name}/>
          )
        }
        if (index === 1) {
          return (
            <img key={index} className={`${styles.icon} ${styles.icon_2}`}
                 src={ingredient.image_mobile} alt={ingredient.name}/>
          )
        }
        if (index === 2) {
          return (
            <img key={index} className={`${styles.icon} ${styles.icon_3}`}
                 src={ingredient.image_mobile} alt={ingredient.name}/>
          )
        }
        if (index === 3) {
          return (
            <img key={index} className={`${styles.icon} ${styles.icon_4}`}
                 src={ingredient.image_mobile} alt={ingredient.name}/>
          )
        }
        if (index === 4) {
          return (
            <img key={index} className={`${styles.icon} ${styles.icon_5}`}
                 src={ingredient.image_mobile} alt={ingredient.name}/>
          )
        } else {
          if (countIngredients > 0) {
            return (
              <div key={index} className={styles.icon_with_count}>
                <img className={`${styles.icon} ${styles.icon_6}`}
                     src={ingredient.image_mobile} alt={ingredient.name}/>
                {countIngredients > 0
                  ? <div className={`text text_type_main-medium ${styles.icon_count}`}>+{countIngredients}</div>
                  : null
                }
              </div>
            )
          }
        }
      })
      }
    </div>
      : null
  );
};

export default OrderIngredientsImage;
