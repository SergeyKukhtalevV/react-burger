import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructor from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerPropTypes } from '../../utils/proptypes-validate';

const BurgerConstructor = ({data}) => {
  return (
    <section className={`mt-25 burgerConstructor.burgerConstructor`}>
      <ul className={`ml-4 mr-4 ${burgerConstructor.ingredients}`}>
        {
          data.map(info => {
            return (
              <div className={`mr-2 ${burgerConstructor.cell}`} key={info._id}>
                <DragIcon type="primary"/>
                <ConstructorElement {...info} text={info.name} thumbnail={info.image}/>
              </div>
            )
          })
        }
      </ul>
      <div className={`mt-10 ${burgerConstructor.total}`}>
        <div className={`text text_type_main-large ${burgerConstructor.price}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4">
          Оформить заказ
        </Button>

      </div>
    </section>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes)
}
