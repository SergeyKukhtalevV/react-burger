import React, {useMemo} from 'react';
import styles from "./order-info.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";


const OrderInfo = ({info, ingredientsOrder}) => {

  const orderSum = useMemo(() => {
    return ingredientsOrder.reduce((total, i) => {
      return total + i.price;
    }, 0)
  }, [ingredientsOrder]);

  const countIngredients = useMemo(() => {
    return ingredientsOrder.reduce((acc, el) => {
    acc[el._id] = (acc[el._id] || 0) + 1;
    return acc;
  }, {})}, [ingredientsOrder]);
  console.log(countIngredients);
  //console.log(Object.keys(countIngredients));
  let count = 1;
  return (
    <div className={styles.modal_orderInfo}>
      <h1 className={`text text_type_digits-default ${styles.id}`}>#{info.number}</h1>
      <p className={`${styles.name} text text_type_main-medium mt-10`}>{info.name}</p>
      {info.status === 'done'
        ? <p className={`${styles.statusDone} text text_type_main-small mt-3`}>Выполнен</p>
        : info.status === 'pending'
          ? <p className={`${styles.statusDone} text text_type_main-small mt-3`}>В работе</p>
          : <p className={`${styles.statusDone} text text_type_main-small mt-3`}>Отменен</p>
      }
      <p className={`text_type_main-medium mt-15`}>Состав:</p>
      <ul className={`${styles.ingredientsList} mt-6 pr-6`}>
        {
         ingredientsOrder.map((ingredient, index) => {
          return (
            <li className={styles.ingredient} key={index}>
              <div className={styles.ingredientContainer}>
                <img className={styles.ingredientImage} src={ingredient.image_mobile}
                     alt={ingredient.name}/>
                <p className={`${styles.name} text text_type_main-small`}>{ingredient.name}</p>
              </div>
              <div className={`text text_type_main-large ${styles.ingredientPrice}`}>
                <p className="text text_type_digits-default">{countIngredients[ingredient._id]} x {ingredient.price}</p>
                <CurrencyIcon type="primary"/>
              </div>
            </li>
          );
        })
        }

      </ul>
      <div className={`${styles.modal_footer} mt-10`}>
        <FormattedDate className={`text text_type_main-default text_color_inactive`}
                       date={new Date(info.createdAt)}/>
        <div className={`text text_type_main-large ${styles.total}`}>
          <p className="text text_type_digits-default">{orderSum}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
