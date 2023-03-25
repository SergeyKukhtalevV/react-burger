import React, {useEffect, useCallback} from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./orders.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {
  getFreshToken,
  getIngredients
} from "../services/actions";
import {
  WS_USER_FEED_CONNECTION_CLOSED,
  WS_USER_FEED_CONNECTION_START
} from "../services/action-types";
import {REMOVE_CURRENT_ORDER_USER_FEED, SET_CURRENT_ORDER_USER_FEED} from "../services/actions/user-feed";
import {getCookie} from "../utils/utils";

const OrdersPage = ({isActive, setModalActive}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '';
  const navigate = useNavigate();
  const {ordersUserFeed, wsTakeMessageUserFeed, wsConnectedUserFeed} = useSelector(store => store.userFeed);
  const {
    ingredientsData
  } = useSelector(store => store.ingredients);
  const token = getCookie('token');
  const accessToken = getCookie('accessToken');

  useEffect(() => {

    if (ingredientsData.length === 0) {
      dispatch(getIngredients());
    }
    if (ordersUserFeed.length === 0) {

      dispatch({type: WS_USER_FEED_CONNECTION_START});
    }
    if (wsTakeMessageUserFeed === 'Invalid or missing token') {

      dispatch(getFreshToken({token}));
      dispatch({type: WS_USER_FEED_CONNECTION_START});
    }
    return () => {
      dispatch({type: WS_USER_FEED_CONNECTION_CLOSED});
    }
  }, [dispatch, ingredientsData, wsTakeMessageUserFeed, wsConnectedUserFeed, ordersUserFeed]);


  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        dispatch({
          type: REMOVE_CURRENT_ORDER_USER_FEED,
        });
      }, 500);
    }
  }, [isActive]);

  const setCurrentOrder = useCallback((id) => {
    setModalActive(true);
    dispatch({
      type: SET_CURRENT_ORDER_USER_FEED,
      id
    });
    navigate(`/profile/orders/${id}`, {state: {from: location}});
  }, [dispatch, navigate, setModalActive, location]);

  return (
    ordersUserFeed.length === 0
      ? <p className="text text_type_main-medium">Идет загрузка Orders.jsx...</p>
      : <div className={styles.container}>
        <ul className={styles.orderCards}>
          {ordersUserFeed.map(order => {
            return <OrderCard order={order} key={order.number} setCurrOrder={setCurrentOrder}/>
          })}
        </ul>
      </div>
  );
};

export default OrdersPage;
