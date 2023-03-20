import React, {useEffect, useState} from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./feed-orders.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {getIngredients} from "../services/actions";
import {WS_FEED_CONNECTION_START} from "../services/action-types";

const FeedOrdersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {orders, ordersDone, ordersPending, ordersTotal, totalToday} = useSelector(store => store.feed);
  const {
    ingredientsData,
    dataRequest,
    dataFailed
  } = useSelector(store => store.ingredients);

  useEffect(() => {
    if (ingredientsData.length === 0) {
      dispatch(getIngredients());
    }
    dispatch({type: WS_FEED_CONNECTION_START});
  }, []);

  return (
    <main className={styles.wrapper}>
      <h1 className={`mt-10 text text_type_main-large`}>Лента заказов</h1>
      {dataRequest && !dataFailed
        ? <p className="text text_type_main-medium">Идет загрузка...</p>
        : <div className={styles.container}>
          <section>
            <ul className={styles.orderCards}>
              {orders.map(order => {
                return <OrderCard order={order} key={order.number}/>
              })}
            </ul>
          </section>
          <section className={styles.sectionOrders}>
            <div className={styles.ordersBoard}>
              <div>
                <h2 className={`text text_type_main-medium pb-6`}>Готовы:</h2>
                <ul className={styles.ordersBoard_done}>
                  {ordersDone.map((order, index) => {
                    return <li key={index}
                               className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>{order}</li>
                  })}
                </ul>
              </div>
              <div>
                <h2 className={`text text_type_main-medium pb-6`}>В работе:</h2>
                <ul className={styles.ordersBoard_done}>
                  {ordersPending.map((order, index) => {
                    return <li key={index}
                               className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>{order}</li>
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.ordersTotal}>
              <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
              <p className={`text text_type_digits-large`}>{ordersTotal}</p>
            </div>
            <div className={styles.ordersTotal}>
              <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
              <p className={`text text_type_digits-large`}>{totalToday}</p>
            </div>
          </section>
        </div>
      }
    </main>
  );
};

export default FeedOrdersPage;
