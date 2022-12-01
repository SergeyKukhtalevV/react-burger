import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerElement from './burgerElement.module.css'

const BurgerElement = (props) => {
  return (
    <li className={burgerElement.card}>
      <img className={BurgerElement.image} src={props.image}
           alt={props.name}/>
      <div>
        <p>{props.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p>{props.name}</p>
    </li>
  )
};

export default BurgerElement;