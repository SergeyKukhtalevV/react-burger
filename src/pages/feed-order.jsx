import React, {useEffect, useCallback, useState, useMemo} from 'react';
import OrderCard from "../components/order-card/order-card";
import styles from "./feed-orders.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {
  getIngredients,
  REMOVE_CURRENT_ORDER_FEED, SET_CURRENT_INGREDIENT,
  SET_CURRENT_ORDER_FEED
} from "../services/actions";
import {WS_FEED_CONNECTION_START} from "../services/action-types";
import {useParams} from "react-router";
import IngredientDetails from "../components/ingredient-details/IngredientDetails";
import Modal from "../components/modal/modal";
import OrderInfo from "../components/order-info/OrderInfo";

const FeedOrderPage = ({isActive, setModalActive}) => {

  const {id} = useParams();
  const {orders, currentOrder} = useSelector(store => store.feed);
  const {ingredientsData} = useSelector(store => store.ingredients);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {

  }, [])

  const ingredientsOrder = useMemo(() => {
      return currentOrder.ingredients.map((item) => {
        return ingredientsData.filter(ingredient => ingredient._id === item)[0];
      });
    }, [currentOrder, ingredientsData]);

    //   return orders.ingredients.map((item, index) => {
    //     return ingredientsData.filter(ingredient => ingredient._id === item)[0];
    //   });
    // }, [order, ingredientsData]);

  // const init = useCallback(() => {
  //     dispatch({
  //       type: SET_CURRENT_ORDER_FEED,
  //       id
  //     });
  //   }, [dispatch, id]
  // )
  //
  // useEffect(
  //   () => {
  //     dispatch(getIngredients());
  //     dispatch({type: WS_FEED_CONNECTION_START});
  //     setIsLoaded(true);
  //     setModalActive(true);
  //     setTimeout(init, 500, [id]);
  //   },
  //   // eslint-disable-next-line
  //   []
  // );
  //

  //
  //
  //
  //   return orders.ingredients.map((item, index) => {
  //     return ingredientsData.filter(ingredient => ingredient._id === item)[0];
  //   });
  // }, [order, ingredientsData]);

  return (

    <Modal active={isActive} setActive={setModalActive}>
      {isLoaded
        ? <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка...</p>
        : <OrderInfo info={currentOrder} ingredientsOrder={ingredientsOrder}/>
      }
    </Modal>

  )


};

export default FeedOrderPage;
