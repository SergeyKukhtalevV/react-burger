import React, {useEffect, useCallback, FC} from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./orders.module.css"
import {useDispatch, useSelector} from '../services/hooks';
import {useLocation, useNavigate} from "react-router-dom";
import {
  getFreshToken,
  getIngredients
} from "../services/actions";
import {
  removeCurrentOrderUserFeedAction,
  setCurrentOrderUserFeedAction,
  wsUserFeedConnectionClosedAction,
  wsUserFeedConnectionStartAction
} from "../services/actions/user-feed";
import {getCookie} from "../utils/utils";
import {TFCWithModal} from "../services/types/data";

const OrdersPage: FC<TFCWithModal> = ({isActive, setModalActive}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {ordersUserFeed, wsTakeMessageUserFeed, wsConnectedUserFeed} = useSelector(store => store.userFeed);
  const {
    ingredientsData
  } = useSelector(store => store.ingredients);
  const token = getCookie('token');

  useEffect(() => {

    if (ingredientsData.length === 0) {
      dispatch(getIngredients());
    }
    if (ordersUserFeed.length === 0) {

      dispatch(wsUserFeedConnectionStartAction());
    }
    if (wsTakeMessageUserFeed === 'Invalid or missing token') {

      dispatch(getFreshToken({token}));
      dispatch(wsUserFeedConnectionStartAction());
    }
    return () => {
      dispatch(wsUserFeedConnectionClosedAction());
    }
  }, // eslint-disable-next-line
    [dispatch, ingredientsData, wsTakeMessageUserFeed, wsConnectedUserFeed, ordersUserFeed]);


  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        dispatch(removeCurrentOrderUserFeedAction());
      }, 500);
    }
  }, // eslint-disable-next-line
    [isActive]);

  const setCurrentOrder = useCallback((id: string) => {
    setModalActive(true);
    dispatch(setCurrentOrderUserFeedAction(id));
    navigate(`/profile/orders/${id}`, {state: {from: location}});
  }, [dispatch, navigate, setModalActive, location]);

  return (
    ordersUserFeed.length === 0
      ? <p className="text text_type_main-medium">Идет загрузка...</p>
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
