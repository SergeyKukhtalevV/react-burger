import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerElement = (props) => {
  return (
    <li>
      <img className={BurgerElement.image} src={'https://code.s3.yandex.net/react/code/bun-02-large.png'}
           alt='props-name'/>
      <div>
        <p>props-price</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p>props-name</p>
    </li>
  );
};

export default BurgerElement;