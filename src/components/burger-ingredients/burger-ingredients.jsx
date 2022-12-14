import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerTabs from "../burger-tabs/burger-tabs";
import BurgerElement from "../burger-element/burger-element";
import PropTypes from "prop-types";
import {burgerPropTypes} from '../../utils/proptypes-validate';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";

const BurgerIngredients = ({data, isActive, setModalActive}) => {

  const [ingredientsInfo, setIngredientsInfo] = React.useState({});

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
        <IngredientDetails info={ingredientsInfo}/>
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
