import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerElementStyles from './burger-element.module.css'

const BurgerElement = (props) => {
  return (
    <li className={`ml-4 mr-2 ${burgerElementStyles.card}`}>
      <Counter count={1} size="default" extraClass="m-1"/>
      <img src={props.image} alt={props.name}/>
      <div className={`mt-1 ${burgerElementStyles.price}`}>
        <p className={`text text_type_digits-default`}>{20} </p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`mt-2 mb-6 text text text_type_main-default`}>{props.name}</p>
    </li>
  )
};

export default BurgerElement;
