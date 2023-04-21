import React, {useEffect, useState, FC} from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css'
import {useSelector} from '../../services/hooks';
import OrderIngredientsImage from "../order-ingredients-image/order-ingredients-image";

import {TIngredient} from "../../services/types/ingredientTypes";
import {TOrder} from "../../services/types/orderTypes";

type TOrderCard = {
  order: TOrder;
  setCurrOrder: (arg: string) => void
}

const OrderCard: FC<TOrderCard> = ({order, setCurrOrder}) => {

    const {ingredientsData} = useSelector(store => store.ingredients);
    const [ingredientsOrder, setIngredientsOrder] = useState<TIngredient[]>([]);
    const [orderSum, setOrderSum] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      setIngredientsOrder(order.ingredients.map((item) => {
        return ingredientsData.filter((ingredient: TIngredient) => ingredient._id === item)[0]
      }))

    }, [ingredientsData]);

    useEffect(() => {
      if (ingredientsOrder.length !== 0) {
        setIsLoaded(true);
        setOrderSum(ingredientsOrder.reduce((total, i) => {
          return total + i.price;
        }, 0))
      }
    }, [ingredientsOrder]);

    return (
      isLoaded
        ? <ul className={`${styles.feedOrder} `} onClick={() => {
          setCurrOrder(order._id)
        }}>
          <li className={styles.orderNumberDate}>
            <p className={`text text_type_digits-default`}>#{order.number}</p>
            <FormattedDate className={`text text_type_main-default text_color_inactive`}
                           date={new Date(order.createdAt)}/>
          </li>
          <li className={`text text_type_main-medium`}>{order.name}</li>
          <li className={styles.iconsAndTotal}>
            <OrderIngredientsImage ingredients={ingredientsOrder}/>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{orderSum}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </li>
        </ul>
        : <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка...</p>
    );
  }
;

export default OrderCard;
