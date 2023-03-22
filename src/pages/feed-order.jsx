import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  getIngredients,
  REMOVE_CURRENT_ORDER_FEED,
  SET_CURRENT_ORDER_FEED
} from "../services/actions";
import {WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START} from "../services/action-types";
import {useParams} from "react-router";
import Modal from "../components/modal/modal";
import OrderInfo from "../components/order-info/OrderInfo";

const FeedOrderPage = ({isActive, setModalActive}) => {

  const {id} = useParams();
  const {orders, currentOrder, wsConnected} = useSelector(store => store.feed);
  const {ingredientsData} = useSelector(store => store.ingredients);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  //const [ingredientsOrder, setIngredientsOrder] = useState([]);

  useEffect(
    () => {
      if (ingredientsData.length === 0) {
        dispatch(getIngredients());
      }
      if (orders.length === 0) {
        dispatch({type: WS_FEED_CONNECTION_START});
      }
      if (orders.length !== 0) {
        setIsLoaded(true);
        setModalActive(true);
        dispatch({
          type: SET_CURRENT_ORDER_FEED,
          id
        });
      }
      // if (currentOrder.length !== 0 && ingredientsData.length !== 0) {
      //   setIngredientsOrder(currentOrder.ingredients.map((item) => {
      //     return ingredientsData.filter(ingredient => ingredient._id === item)[0]
      //   }));
      // }
      // if(wsConnected) {
      //   setIsLoaded(true);
      //   setModalActive(true);
      // }
    },
    // eslint-disable-next-line
    [orders, currentOrder, ingredientsData]
  );
    const ingredientsOrder = useMemo(() => {
      if (wsConnected) {
        return currentOrder.ingredients.map((item) => {
          return ingredientsData.filter(ingredient => ingredient._id === item)[0];
        });
      }
    }, [currentOrder, ingredientsData]);

return (
  <Modal active={isActive} setActive={setModalActive}>
    {!isLoaded
      ? <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка feed-order...</p>
      : <OrderInfo info={currentOrder} ingredientsOrder={ingredientsOrder}/>
    }
  </Modal>

)


}
;

export default FeedOrderPage;
