import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerPropTypes} from '../../utils/proptypes-validate';
import OrderDoneSvg from "../../images/graphics.svg";
import Modal from "../modal/modal";

const burgerConstructor = ({data, setModalActive, isActive, orderNumber}) => {

  const bun = data.filter(info => {
    if (info.type === 'bun') {
      return info;
    }
  });
  return (
    <section className={`mt-25 ${burgerConstructorStyles.burgerConstructor}`}>
      <div className={`mr-4 mb-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
        <ConstructorElement {...bun[0]} text={bun[0].name + '(верх)'} thumbnail={bun[0].image} type={'top'}
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
      <div className={`mr-4 mt-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
        <ConstructorElement {...bun[0]} text={bun[0].name + '(низ)'} thumbnail={bun[0].image} type={'bottom'}
                            isLocked={true}/>
      </div>
      <div className={`mt-10 ${burgerConstructorStyles.total}`}>
        <div className={`text text_type_main-large ${burgerConstructorStyles.price}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4" onClick={() => {
          setModalActive(true)
        }}>
          Оформить заказ
        </Button>

      </div>

      <Modal active={isActive} setActive={setModalActive}>
        <div className={`${burgerConstructorStyles.modal_order}`}>
          <p className="mt-30 text text_type_digits-large">{orderNumber}</p>
          <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
          <img className={"mt-15"} src={OrderDoneSvg} alt={"иконка принятия заказа"}/>
          <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="mt-2 mb-30 text text_type_main-default  text_color_inactive">Дождитесь готовности на орбитальной
            станции</p>
        </div>
      </Modal>
    </section>

  );
};

export default burgerConstructor;

burgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired,
  setModalActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  orderNumber: PropTypes.number.isRequired
}
