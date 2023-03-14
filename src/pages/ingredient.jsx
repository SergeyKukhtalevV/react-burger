import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, SET_CURRENT_INGREDIENT} from "../services/actions/ingredients";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/IngredientDetails";

const IngredientPage = ({isActive, setModalActive}) => {

  const {id} = useParams();
  const {currentIngredient} = useSelector(store => store.ingredients);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const init = useCallback(() => {
      dispatch({
        type: SET_CURRENT_INGREDIENT,
        id
      });
    }, [dispatch, id]
  )

  useEffect(
    () => {
      dispatch(getIngredients());
      setIsLoaded(true);
      setModalActive(true);
      setTimeout(init, 500, [id]);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Modal active={isActive} setActive={setModalActive}>
      {!isLoaded
        ? <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка...</p>
        : <IngredientDetails info={currentIngredient}/>
      }
    </Modal>
  );
};

export default IngredientPage;

