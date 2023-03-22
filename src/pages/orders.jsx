import React, {useEffect, useCallback} from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./orders.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {
  getIngredients
} from "../services/actions";
import {
  WS_USER_FEED_CONNECTION_CLOSED,
  WS_USER_FEED_CONNECTION_START
} from "../services/action-types";
import {REMOVE_CURRENT_ORDER_USER_FEED, SET_CURRENT_ORDER_USER_FEED} from "../services/actions/user-feed";

const OrdersPage = ({isActive, setModalActive}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '';
  const navigate = useNavigate();
  const {orders} = useSelector(store => store.userFeed);
  const {
    ingredientsData,
    dataRequest,
    dataFailed
  } = useSelector(store => store.ingredients);

  useEffect(() => {
    if (ingredientsData.length === 0) {
      dispatch(getIngredients());
    }
    dispatch({type: WS_USER_FEED_CONNECTION_START});
    // return () => {
    //   dispatch({type: WS_USER_FEED_CONNECTION_CLOSED});
    // }
  }, []);

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        dispatch({
          type: REMOVE_CURRENT_ORDER_USER_FEED,
        });
      }, 500);
    }
  }, [dispatch, isActive]);

  const setCurrentOrder = useCallback((id) => {
    setModalActive(true);

    dispatch({
      type: SET_CURRENT_ORDER_USER_FEED,
      id
    });
    navigate(`/orders/${id}`, {state: {from: location}});
  }, [dispatch, navigate, setModalActive, location]);
  
  return (
      dataRequest && !dataFailed
        ? <p className="text text_type_main-medium">Идет загрузка...</p>
        : <div className={styles.container}>
            <ul className={styles.orderCards}>
              {orders.map(order => {
                return <OrderCard order={order} key={order.number} setCurrOrder={setCurrentOrder}/>
              })}
            </ul>
        </div>
  );
};

export default OrdersPage;
