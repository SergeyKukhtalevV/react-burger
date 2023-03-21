import React, {useMemo} from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css'
import {useSelector} from "react-redux";
import OrderIngredientsImage from "../order-ingredients-image/order-ingredients-image";

const OrderCard = ({order, setCurrOrder}) => {

  const {ingredientsData} = useSelector(store => store.ingredients);

  const ingredientsOrder = useMemo(() => {
    return order.ingredients.map((item) => {
      return ingredientsData.filter(ingredient => ingredient._id === item)[0];
    });
  }, [order, ingredientsData]);

  const orderSum = useMemo(() => {
    return ingredientsOrder.reduce((total, i) => {
        return total + i.price;
    }, 0)
  }, [ingredientsOrder]);

  return (
    <ul className={`${styles.feedOrder} `} onClick={() =>{setCurrOrder(order._id)}} >
      <li className={styles.orderNumberDate}>
        <p className={`text text_type_digits-default`}>#{order.number}</p>
        <FormattedDate className={`text text_type_main-default text_color_inactive`}
                       date={new Date(order.createdAt)}/>
      </li>
      <li className={`text text_type_main-medium`}>{order.name}</li>
      <li className={styles.iconsAndTotal}>
        <OrderIngredientsImage ingredientsOrder={ingredientsOrder}/>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{orderSum}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </li>
    </ul>
  );
};

export default OrderCard;
