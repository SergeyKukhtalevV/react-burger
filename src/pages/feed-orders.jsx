import React from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./feed-orders.module.css"

const FeedOrdersPage = () => {
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
      <div className={styles.conteiner}>
      <section>
        <ul className={styles.orderCards}>
          <OrderCard />
        </ul>
      </section>
      <section>

      </section>
      </div>
    </main>
  );
};

export default FeedOrdersPage;
