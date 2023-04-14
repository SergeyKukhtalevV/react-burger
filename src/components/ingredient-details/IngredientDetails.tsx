import React, {FC} from 'react';
import ingredientDetailsStyles from "./ingredient-details.module.css";
import {TIngredient} from '../../services/types/ingredientTypes';

type TInfo<TIngredient> = {
  info: TIngredient;
}

const IngredientDetails: FC<TInfo<TIngredient>> = ({info}) => {
  return (
    <div className={`${ingredientDetailsStyles.modal_ingredient}`}>
      <p className="mt-10 ml-10 pt-3 text text_type_main-large">Детали ингредиента</p>
      <div className={`${ingredientDetailsStyles.modal_ingredientDesc}`}>
        <img className={`mt-3`} src={info.image_large} alt={"изображение ингредиента"}/>
        <p className="mt-4 text text_type_main-medium">{info.name}</p>
        <ul className={`mt-8 mb-15 ${ingredientDetailsStyles.modal_ingredientProp}`}>
          <li className={`${ingredientDetailsStyles.modal_ingredientInfo}`}>
            <p className="text text_type_main-default  text_color_inactive">Калории,ккал</p>
            <p className=" text text_type_digits-default  text_color_inactive">{info.calories}</p>
          </li>
          <li className={`${ingredientDetailsStyles.modal_ingredientInfo}`}>
            <p className="text text_type_main-default  text_color_inactive">Белки, г</p>
            <p className=" text text_type_digits-default  text_color_inactive">{info.proteins}</p>
          </li>
          <li className={`${ingredientDetailsStyles.modal_ingredientInfo}`}>
            <p className="text text_type_main-default  text_color_inactive">Жиры, г</p>
            <p className=" text text_type_digits-default  text_color_inactive">{info.fat}</p>
          </li>
          <li className={`${ingredientDetailsStyles.modal_ingredientInfo}`}>
            <p className="text text_type_main-default  text_color_inactive">Углеводы, г</p>
            <p className=" text text_type_digits-default  text_color_inactive">{info.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
