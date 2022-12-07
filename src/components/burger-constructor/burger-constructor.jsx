import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerPropTypes} from '../../utils/proptypes-validate';

const burgerConstructor = ({data, bunBurger, setBunBurger}) => {

  data.forEach(info => {
    if (info.type === 'bun') {
      setBunBurger(info);
    }
  });
  return (
    <section className={`mt-25 ${burgerConstructorStyles.burgerConstructor}`}>
      <div className={`mr-4 mb-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`} key={bunBurger._id}>
        <ConstructorElement {...bunBurger} text={bunBurger.name + '(верх)'} thumbnail={bunBurger.image} type={'top'}
                            isLocked={true}/>
      </div>
      <ul className={`ml-4 mr-4 ${burgerConstructorStyles.ingredients}`}>
        {
          data.map((info, index) => {
            if (info.type !== 'bun') {
              return (
                <li className={`mr-2 ${burgerConstructorStyles.cell}`} key={info._id + index}>
                  <DragIcon type="primary"/>
                  <ConstructorElement {...info} text={info.name} thumbnail={info.image}/>
                </li>
              )
            }
          })
        }
      </ul>
      <div className={`mr-4 mt-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`} key={bunBurger._id}>
        <ConstructorElement {...bunBurger} text={bunBurger.name + '(низ)'} thumbnail={bunBurger.image} type={'bottom'}
                            isLocked={true}/>
      </div>
      <div className={`mt-10 ${burgerConstructorStyles.total}`}>
        <div className={`text text_type_main-large ${burgerConstructorStyles.price}`}>
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

export default burgerConstructor;
//
// burgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(burgerPropTypes).isRequired
// }
