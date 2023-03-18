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
        "name": "Death Star Starship Main бургер",
        "number": 1234567890,
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
        <p className={`text text_type_digits-default`}>{`#${info.orders[0].number}`}</p>
        <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`}
                       date={new Date(info.orders[0].createdAt)}/>
      </li>
      <li className={`text text_type_main-medium`}>{info.orders[0].name}</li>
      <li className={styles.iconsAndTotal}>
        <ul className={styles.icons}>
          <img className={`${styles.icon} ${styles.icon_1}`}
               src={"https://code.s3.yandex.net/react/code/bun-01-mobile.png"} alt={"Флюоресцентная булка R2-D3"}/>
          <img className={`${styles.icon} ${styles.icon_2}`}
               src={"https://code.s3.yandex.net/react/code/sauce-04-mobile.png"} alt={"Соус фирменный Space Sauce"}/>
          <img className={`${styles.icon} ${styles.icon_3}`}
               src={"https://code.s3.yandex.net/react/code/meat-02-mobile.png"}
               alt={"Мясо бессмертных моллюсков Protostomia"}/>
          <img className={`${styles.icon} ${styles.icon_4}`}
               src={"https://code.s3.yandex.net/react/code/sauce-04-mobile.png"} alt={"Соус фирменный Space Sauce"}/>
          <img className={`${styles.icon} ${styles.icon_5}`}
               src={"https://code.s3.yandex.net/react/code/meat-02-mobile.png"}
               alt={"Мясо бессмертных моллюсков Protostomia"}/>
          <img className={`${styles.icon} ${styles.icon_6}`}
               src={"https://code.s3.yandex.net/react/code/sauce-04-mobile.png"} alt={"Соус фирменный Space Sauce"}/>
          <div className={`text text_type_main-medium ${styles.icon_count}`}>+3</div>
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
