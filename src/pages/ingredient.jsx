import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, SET_CURRENT_INGREDIENT} from "../services/actions/ingredients";
import styles from './ingredient.module.css';
import Modal from "../components/modal/modal";
import {useLocation} from "react-router-dom";

const IngredientPage = ({isActive, setModalActive}) => {

  const {id} = useParams();
  const {ingredientsData, currentIngredient} = useSelector(store => store.ingredients);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const init = async () => {
    await dispatch({
      type: SET_CURRENT_INGREDIENT,
      id
    })
    console.log(ingredientsData);

  }

  useEffect(
    () => {
      dispatch(getIngredients());
      setIsLoaded(true);
      setModalActive(true);
      setTimeout(init, 500, [id]);
    },
    []
  );

  return (
    <Modal active={isActive} setActive={setModalActive}>
      {!isLoaded
        ? <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка...</p>
        :
        <div className={`${styles.modal_ingredient}`}>
          <p className="mt-10 ml-10 pt-3 text text_type_main-large">Детали ингредиента</p>
          <div className={`${styles.modal_ingredientDesc}`}>
            <img className={`mt-3`} src={currentIngredient.image_large} alt={"изображение ингредиента"}/>
            <p className="mt-4 text text_type_main-medium">{currentIngredient.name}</p>
            <ul className={`mt-8 mb-15 ${styles.modal_ingredientProp}`}>
              <li className={`${styles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Калории,ккал</p>
                <p className=" text text_type_digits-default  text_color_inactive">{currentIngredient.calories}</p>
              </li>
              <li className={`${styles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Белки, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{currentIngredient.proteins}</p>
              </li>
              <li className={`${styles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Жиры, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{currentIngredient.fat}</p>
              </li>
              <li className={`${styles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Углеводы, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{currentIngredient.carbohydrates}</p>
              </li>
            </ul>
          </div>
        </div>
      }
    </Modal>
  );
};

export default IngredientPage;

// IngredientDetails.propTypes = {
//   currentIngredient: PropTypes.object.isRequired
// }
