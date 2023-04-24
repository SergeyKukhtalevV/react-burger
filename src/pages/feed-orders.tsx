import React, {useEffect, useCallback, FC} from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./feed-orders.module.css"
import {useDispatch, useSelector} from '../services/hooks';
import {useLocation, useNavigate} from "react-router-dom";
import {
  getIngredients,
  removeCurrentOrderFeedAction,
  setCurrentOrderFeedAction, wsFeedConnectionClosedAction, wsFeedConnectionStartAction
} from "../services/actions";

type TFeedOrdersPage = {
  isActive: boolean;
  setModalActive: (arg: boolean) => void
}

const FeedOrdersPage: FC<TFeedOrdersPage> = ({isActive, setModalActive}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '';
  const navigate = useNavigate();
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
    dispatch(wsFeedConnectionStartAction());
    return () => {
      dispatch(wsFeedConnectionClosedAction());
    }
  }, // eslint-disable-next-line
    []);

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        dispatch(removeCurrentOrderFeedAction());
      }, 500);
    }
  }, [dispatch, isActive]);

  const setCurrentOrder = useCallback((id: string) => {
    setModalActive(true);

    dispatch(setCurrentOrderFeedAction(id));
    navigate(`/feed/${id}`, {state: {from: location}});
  }, [dispatch, navigate, setModalActive, location]);

  return (
    <main className={styles.wrapper}>
      <h1 className={`mt-10 text text_type_main-large`}>Лента заказов</h1>
      {dataRequest && !dataFailed
        ? <p className="text text_type_main-medium">Идет загрузка...</p>
        : <div className={styles.container}>
          <section className={styles.sectionCards} >
            <ul className={styles.orderCards}>
              {orders.map(order => {
                return <OrderCard order={order} key={order.number} setCurrOrder={setCurrentOrder}/>
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
                               className={`text text_type_digits-default`}>{order}</li>
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
