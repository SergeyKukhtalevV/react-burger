import React, {useEffect, useState, FC} from 'react';
import {useDispatch, useSelector} from '../services/hooks';
import {useParams} from "react-router";
import {getIngredients} from "../services/actions";
import Modal from "../components/modal/modal";
import OrderInfo from "../components/order-info/OrderInfo";
import {
  setCurrentOrderUserFeedAction,
  wsUserFeedConnectionStartAction
} from "../services/actions/user-feed";
import {TIngredient} from "../services/types/ingredientTypes";
import {TFCWithModal} from "../services/types/data";

const OrderPage: FC<TFCWithModal> = ({isActive, setModalActive}) => {

  const {id} = useParams();
  const {ordersUserFeed, currentOrderUserFeed, wsConnectedUserFeed} = useSelector(store => store.userFeed);
  const {ingredientsData} = useSelector(store => store.ingredients);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredientsOrder, setIngredientsOrder] = useState<TIngredient[]>([]);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (ingredientsData.length === 0) {
        dispatch(getIngredients());
      }
      if (ordersUserFeed.length !== 0 && id) {
        dispatch(setCurrentOrderUserFeedAction(id));
      }
      if (ordersUserFeed.length === 0) {
        dispatch(wsUserFeedConnectionStartAction());
      }
      if (currentOrderUserFeed) {
        setIsLoaded(true);
        setModalActive(true);
        if (currentOrderUserFeed.ingredients) {
          setIngredientsOrder(currentOrderUserFeed.ingredients.map((item) => {
            return ingredientsData.filter(ingredient => ingredient._id === item)[0];
          }));
        }

      }
    },
    // eslint-disable-next-line
    [ordersUserFeed, ingredientsData, currentOrderUserFeed, wsConnectedUserFeed]
  );

  return (
    <Modal active={isActive} setActive={setModalActive}>
      {!isLoaded
        ? <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка...</p>
        : <OrderInfo info={currentOrderUserFeed} ingredientsOrder={ingredientsOrder}/>
      }
    </Modal>

  )


};

export default OrderPage;
