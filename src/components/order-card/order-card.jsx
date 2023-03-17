import React from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css'

const OrderCard = () => {
  const info = {
    "success": true,
    "orders": [
      {
        "ingredients": [
          "60d3463f7034a000269f45e7",
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e8",
          "60d3463f7034a000269f45ea"
        ],
        "_id": "",
        "status": "done",
        "number": 10,
        "createdAt": "2021-06-23T14:43:22.587Z",
        "updatedAt": "2021-06-23T14:43:22.603Z"
      }
    ],
    "total": 1,
    "totalToday": 1
  };

  return (
    <ul className={`${styles.feedOrder} `}>
      <li className={styles.orderNumberDate}>
        <p classNeme={`text text_type_digits-default`}>{`#${info.number}`}</p>
        <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`}
                       date={new Date(info.createdAt)}/>
      </li>
      <li className={`text text_type_main-medium`}>Death Star Starship Main бургер</li>
      <li className={styles.iconsAndTotal}>
        <ul className={styles.icons}>
          <li className={styles.icon}></li>
        </ul>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">480</p>
          <CurrencyIcon type="primary"/>
        </div>
      </li>
    </ul>
  );
};

export default OrderCard;
