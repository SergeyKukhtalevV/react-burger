import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerTabs from "../burger-tabs/burger-tabs";
import BurgerElement from "../burger-element/burger-element";
import PropTypes from "prop-types";
import {burgerPropTypes} from '../../utils/proptypes-validate';
import Modal from "../modal/modal";

const BurgerIngredients = ({data, isActive, setModalActive}) => {

  const [ingredientsInfo, setIngredientsInfo] = React.useState([]);

  const [ingredientsTypes, setIngredients] = React.useState([
    {id: 1, name: 'Булки', type: 'bun'},
    {id: 2, name: 'Соусы', type: 'sauce'},
    {id: 3, name: 'Начинка', type: 'main'}
  ]);

  return (
    <section>
      <h1 className={`mt-10 text text_type_main-large ${burgerIngredientsStyles.title}`}>Соберите бургер</h1>
      <BurgerTabs/>
      <ul className={`mt-10 ${burgerIngredientsStyles.ingredients}`}>
        {
          ingredientsTypes.map(type => {
            return (
              <li className={`${burgerIngredientsStyles.elements}`} key={type.id}>
                <p className={`text text_type_main-medium ${burgerIngredientsStyles.subtitle}`}>
                  {type.name}
                </p>
                <ul className={`mt-6 mb-10 ${burgerIngredientsStyles.cards}`}>
                  {
                    data.map(info => {
                      if (type.type === info.type) {
                        return (
                          <BurgerElement props={info} key={info._id} setActive={setModalActive}
                                         setInfo={setIngredientsInfo}/>
                        )
                      }
                    })
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>

      <Modal active={isActive} setActive={setModalActive}>
        <div className={`${burgerIngredientsStyles.modal_ingredient}`}>
          <p className="mt-10 ml-10 pt-3 text text_type_main-large">Детали ингредиента</p>
          <div className={`${burgerIngredientsStyles.modal_ingredientDesc}`}>
            <img className={`mt-3`} src={ingredientsInfo.image_large} alt={"изображение ингредиента"}/>
            <p className="mt-4 text text_type_main-medium">{ingredientsInfo.name}</p>
            <ul className={`mt-8 mb-15 ${burgerIngredientsStyles.modal_ingredientProp}`}>
              <li className={`${burgerIngredientsStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Калории,ккал</p>
                <p className=" text text_type_digits-default  text_color_inactive">{ingredientsInfo.calories}</p>
              </li>
              <li className={`${burgerIngredientsStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Белки, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{ingredientsInfo.proteins}</p>
              </li>
              <li className={`${burgerIngredientsStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Жиры, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{ingredientsInfo.fat}</p>
              </li>
              <li className={`${burgerIngredientsStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Углеводы, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{ingredientsInfo.carbohydrates}</p>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired,
  isActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
}
