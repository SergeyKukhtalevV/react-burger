import React, {useEffect, useState, FC} from 'react';
import {useDispatch, useSelector} from '../services/hooks';
import {
  getIngredients,
  setCurrentOrderFeedAction, wsFeedConnectionStartAction
} from "../services/actions";
import {useParams} from "react-router";
import Modal from "../components/modal/modal";
import OrderInfo from "../components/order-info/OrderInfo";
import {TIngredient} from "../services/types/ingredientTypes";
import {TFCWithModal} from "../services/types/data";

const FeedOrderPage: FC<TFCWithModal> = ({isActive, setModalActive}) => {

  const {id} = useParams();
  const {orders, currentOrder} = useSelector(store => store.feed);
  const {ingredientsData} = useSelector(store => store.ingredients);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [ingredientsOrder, setIngredientsOrder] = useState<TIngredient[]>([]);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (ingredientsData.length === 0) {
        dispatch(getIngredients());
      }
      if (orders.length === 0) {
        dispatch(wsFeedConnectionStartAction());
      }
      if (orders.length !== 0) {
        dispatch(setCurrentOrderFeedAction(id!));
      }
      if (currentOrder) {
        setIsLoaded(true);
        setModalActive(true);
        if(currentOrder.ingredients) {
          setIngredientsOrder(currentOrder.ingredients.map((item) => {
            return ingredientsData.filter(ingredient => ingredient._id === item)[0];
          }));
        }
      }
    },
    // eslint-disable-next-line
    [orders, currentOrder, ingredientsData]
  );

return (
  <Modal active={isActive} setActive={setModalActive}>
    {!isLoaded
      ? <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка...</p>
      : <OrderInfo info={currentOrder} ingredientsOrder={ingredientsOrder}/>
    }
  </Modal>

)


}
;

export default FeedOrderPage;
