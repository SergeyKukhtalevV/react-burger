import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerElement from './burgerElement.module.css'

const BurgerElement = (props) => {
  return (
    <li className={burgerElement.card}>
      <Counter count={1} size="default" extraClass="m-1" />
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