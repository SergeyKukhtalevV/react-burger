import React, {useEffect, useState, FC} from 'react';
import styles from "../order-info/order-info.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from '../../services/types/ingredientTypes';
import {TOrder} from '../../services/types/orderTypes';
import OrderInfo from "../order-info/OrderInfo";

type TOrderIngredient = {
  info: TIngredient;
  quantity: any
}


const OrderIngredient: FC<TOrderIngredient> = ({info, quantity}) => {
  return (
    <li className={styles.ingredient}>
      <div className={styles.ingredientContainer}>
        <img className={styles.ingredientImage} src={info.image_mobile} alt={info.name}/>
        < p className={`${styles.name} text text_type_main-small`}>
          {info.name}
        </p>
      </div>
      <div className={`text text_type_main-large ${styles.ingredientPrice}` }>
        <p className="text text_type_digits-default">
          {quantity} x {info.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
);

}

export default OrderIngredient;
