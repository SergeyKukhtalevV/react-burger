import React from 'react';
import styles from "./order-info.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo = () => {
  return (
    <div className={styles.modal_orderInfo}>
      <h1 className={`text text_type_digits-default ${styles.id}`}>#34533</h1>
      <p className={`${styles.name} text text_type_main-medium mt-10`}>Black Hole Singularity острый бургер</p>
      <p className={`${styles.statusDone} text text_type_main-small mt-3`}>Выполнен</p>
      {/*<p className={`text text_type_main-small mt-3`}>Отменен</p>*/}
      <p className={`text_type_main-medium mt-15`}>Состав:</p>
      <ul className={`${styles.ingredientsList} mt-6 pr-6`}>
        <li className={styles.ingredient}>
          <div className={styles.ingredientContainer}>
            <img className={styles.ingredientImage} src={"https://code.s3.yandex.net/react/code/bun-01-mobile.png"}
                 alt={"Флюоресцентная булка R2-D3"}/>
            <p className={`${styles.name} text text_type_main-small`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`text text_type_main-large ${styles.ingredientPrice}`}>
            <p className="text text_type_digits-default">2 x 20</p>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
        <li className={styles.ingredient}>
          <div className={styles.ingredientContainer}>
            <img className={styles.ingredientImage} src={"https://code.s3.yandex.net/react/code/bun-01-mobile.png"}
                 alt={"Флюоресцентная булка R2-D3"}/>
            <p className={`${styles.name} text text_type_main-small`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`text text_type_main-large ${styles.ingredientPrice}`}>
            <p className="text text_type_digits-default">2 x 20</p>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
        <li className={styles.ingredient}>
          <div className={styles.ingredientContainer}>
            <img className={styles.ingredientImage} src={"https://code.s3.yandex.net/react/code/bun-01-mobile.png"}
                 alt={"Флюоресцентная булка R2-D3"}/>
            <p className={`${styles.name} text text_type_main-small`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`text text_type_main-large ${styles.ingredientPrice}`}>
            <p className="text text_type_digits-default">2 x 20</p>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
        <li className={styles.ingredient}>
          <div className={styles.ingredientContainer}>
            <img className={styles.ingredientImage} src={"https://code.s3.yandex.net/react/code/bun-01-mobile.png"}
                 alt={"Флюоресцентная булка R2-D3"}/>
            <p className={`${styles.name} text text_type_main-small`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={`text text_type_main-large ${styles.ingredientPrice}`}>
            <p className="text text_type_digits-default">2 x 20</p>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
      </ul>
      <div className={`${styles.modal_footer} mt-10`}>
        <FormattedDate className={`text text_type_main-default text_color_inactive`}
                       date={new Date("2021-06-23T14:43:22.587Z")}/>
        <div className={`text text_type_main-large ${styles.total}`}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
