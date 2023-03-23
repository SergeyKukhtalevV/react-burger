import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../services/actions";
import {WS_USER_FEED_CONNECTION_START} from "../services/action-types";
import Modal from "../components/modal/modal";
import OrderInfo from "../components/order-info/OrderInfo";
import {SET_CURRENT_ORDER_USER_FEED} from "../services/actions/user-feed";

const OrderPage = ({isActive, setModalActive}) => {

  const {id} = useParams();
  const {ordersUserFeed, currentOrderUserFeed, wsConnectedUserFeed} = useSelector(store => store.userFeed);
  const {ingredientsData} = useSelector(store => store.ingredients);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (ingredientsData.length === 0) {
        dispatch(getIngredients());
      }
      if (ordersUserFeed.length === 0) {
        dispatch({type: WS_USER_FEED_CONNECTION_START});
      }
      if (ordersUserFeed.length !== 0) {
        setIsLoaded(true);
        setModalActive(true);
        dispatch({
          type: SET_CURRENT_ORDER_USER_FEED,
          id
        });
      }
    },
    // eslint-disable-next-line
    [ordersUserFeed, currentOrderUserFeed]
  );

  const ingredientsOrder = useMemo(() => {
    if (wsConnectedUserFeed) {
      return currentOrderUserFeed.ingredients.map((item) => {
        return ingredientsData.filter(ingredient => ingredient._id === item)[0];
      });
    }
  }, [currentOrderUserFeed, ingredientsData]);
  return (
    <Modal active={isActive} setActive={setModalActive}>
      {!isLoaded
        ? <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка Order.jsx...</p>
        : <OrderInfo info={currentOrderUserFeed} ingredientsOrder={ingredientsOrder}/>
      }
    </Modal>

  )


};

export default OrderPage;
