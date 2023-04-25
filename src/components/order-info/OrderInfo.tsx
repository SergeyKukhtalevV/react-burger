import React, {useEffect, useState, FC} from 'react';
import styles from "./order-info.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from '../../services/types/ingredientTypes';
import {TOrder} from '../../services/types/orderTypes';

type TOrderInfo = {
  info: TOrder;
  ingredientsOrder: TIngredient[];
  children?: React.ReactNode
}

type TAcc = {
  [key: string]: number;
};


const OrderInfo: FC<TOrderInfo> = ({info, ingredientsOrder}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderSum, setOrderSum] = useState(0);
  const [countIngredients, setCountIngredients] = useState<TAcc[]>([]);

  useEffect(() => {

    if (ingredientsOrder.length !== 0) {
      setOrderSum(ingredientsOrder.reduce((total, i) => {
        return total + i.price;
      }, 0));
      setCountIngredients(ingredientsOrder.reduce((acc: TAcc[], el): TAcc[] => {
        // @ts-ignore
        acc[el._id] = (acc[el._id] || 0) + 1;
        return acc;
      }, []));
      setIsLoaded(true);
    }
  }, [ingredientsOrder]);

  return (
    !isLoaded
      ? <p className="text text_type_main-medium">Идет загрузка...</p>
      : <div className={styles.modal_orderInfo}>

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
            Object.keys(countIngredients).map((key:string, index) => {
              const ingr = ingredientsOrder.find(ingredient => ingredient._id === key);
              if(ingr) {
                return (
                  <li className={styles.ingredient} key={index}>
                    <div className={styles.ingredientContainer}>
                      <img className={styles.ingredientImage}
                           src={ingr.image_mobile}
                           alt={ingr.name}/>
                      <p
                        className={`${styles.name} text text_type_main-small`}>{ingr.name}</p>
                    </div>
                    <div className={`text text_type_main-large ${styles.ingredientPrice}`}>
                      <p
                        className="text text_type_digits-default">
                        {// @ts-ignore
                          countIngredients[key]} x {ingr.price}</p>
                      <CurrencyIcon type="primary"/>
                    </div>
                  </li>
                );
              }
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
