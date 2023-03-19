import React from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./feed-orders.module.css"

const FeedOrdersPage = () => {
  const info = {
    "success": true,
    "orders": [
      {
        "ingredients": [
          "60d3b41abdacab0026a733c7",
          "60d3b41abdacab0026a733cd",
          "60d3b41abdacab0026a733c9",
          "60d3b41abdacab0026a733cd"
        ],
        "_id": "",
        "status": "done",
        "number": 0,
        "createdAt": "2021-06-23T14:43:22.587Z",
        "updatedAt": "2021-06-23T14:43:22.603Z"
      }
    ],
    "total": 1,
    "totalToday": 1
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={`mt-10 text text_type_main-large`}>Лента заказов</h1>
      <div className={styles.container}>
        <section>
          <ul className={styles.orderCards}>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
          </ul>
        </section>
        <section className={styles.sectionOrders}>
          <div className={styles.ordersBoard}>
            <div>
              <h2 className={`text text_type_main-medium pb-6`}>Готовы:</h2>
              <ul className={styles.ordersBoard_done}>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
                <li className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>034533</li>
              </ul>
            </div>
          <div>
            <h2 className={`text text_type_main-medium pb-6`}>В работе:</h2>
            <ul className={styles.ordersBoard_done}>
              <li className={`text text_type_digits-default`}>045678</li>
              <li className={`text text_type_digits-default`}>045678</li>
              <li className={`text text_type_digits-default`}>045678</li>
              <li className={`text text_type_digits-default`}>045678</li>
            </ul>
          </div>
          </div>
          <div className={styles.ordersTotal}>
            <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
            <p className={`text text_type_digits-large`}>28 752</p>
          </div>
          <div className={styles.ordersTotal}>
            <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
            <p className={`text text_type_digits-large`}>123</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FeedOrdersPage;
