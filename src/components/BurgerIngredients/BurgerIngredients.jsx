import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import {Box} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burgerIngredients.module.css'
import BurgerTab from "../BurgerTab/BurgerTab";
import BurgerElement from "../BurgerElement/BurgerElement";
import data from '../../utils/data';

const BurgerIngredients = () => {
  return (
    <div>
      <h1 className={`text text_type_main-large ${burgerIngredients.title}`}>Соберите бургер</h1>
      <BurgerTab/>
      <p className={`text text_type_main-medium ${burgerIngredients.subtitle}`}>Булки</p>
      <ul className={burgerIngredients.cards}>
        {
          data.map(info => {
            return (
              <BurgerElement {...info}/>
            )
          })

        }
      </ul>
    </div>
  );
};

export default BurgerIngredients;