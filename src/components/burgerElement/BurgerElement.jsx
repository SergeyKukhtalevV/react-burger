import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerElement from './burgerElement.module.css'

const BurgerElement = (props) => {
  return (
    <li className={`ml-4 mr-2 ${burgerElement.card}`}>
      <Counter count={1} size="default" extraClass="m-1"/>
      <img className={BurgerElement.image} src={props.image}
           alt={props.name}/>
      <div className={`mt-1 ${burgerElement.price}`}>
        <p className={`text text_type_digits-default`}>{20} </p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`mt-2 mb-6 text text text_type_main-default`}>{props.name}</p>
    </li>
  )
};

export default BurgerElement;
