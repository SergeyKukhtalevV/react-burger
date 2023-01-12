import React, {useContext, useReducer, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerPropTypes} from '../../utils/proptypes-validate';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/OrderDetails";
import {BurgerContext} from "../../services/burgerContext";
import {URL_API} from '../../constants/constants';

const urlOrder = `${URL_API}/orders`;

const BurgerConstructor = ({data, setModalActive, isActive}) => {

    const ingredientsInfo = useContext(BurgerContext);

    const [state, setState] = useState(ingredientsInfo.ingredientsData.filter(ingredient => ingredient.type !== 'bun'));

    const [orderNumber, setOrderNumber] = useState(null);

    const bun = ingredientsInfo.ingredientsData.filter(info => {
      if (info.type === 'bun') {
        return info;
      }
    });
    const [orderInfo, setOrderInfo] = useState({
      ingredientsID: ingredientsInfo.ingredientsData.map(ingredient => ingredient._id),
      orderData: undefined,
      loading: true,
      error: ''
    });

    const getOrder = async () => {
        setOrderInfo({...orderInfo, orderData: undefined, loading: true});
        try {
          let response = await fetch(urlOrder, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "ingredients": orderInfo.ingredientsID
            })
          });
          let data = await response.json();

          setOrderInfo({...orderInfo, orderData: data, loading: false});
          setOrderNumber(data.order.number);
        } catch (e) {
          setOrderInfo({...orderInfo, error: e.message, loading: false});
        }
      }
///////////////////////////////
    return (
      <section className={`mt-25 ${burgerConstructorStyles.burgerConstructor}`}>
        <div className={`mr-4 mb-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
          <ConstructorElement {...bun[0]} text={bun[0].name + '(верх)'} thumbnail={bun[0].image} type={'top'}
                              isLocked={true}/>
        </div>
        <ul className={`ml-4 mr-4 ${burgerConstructorStyles.ingredients}`}>
          {
            ingredientsInfo.ingredientsData.map((info, index) => {
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
            <p
              className="text text_type_digits-medium">{state.reduce((total, i) => total + i.price, bun[0].price * 2)}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4 buttonOrder" onClick={() => {
            getOrder();
            setModalActive(true);
          }}>
            Оформить заказ
          </Button>

        </div>

        <Modal active={isActive} setActive={setModalActive}>
          <OrderDetails orderNum={orderNumber ? orderNumber : 'Loading...'}/>
        </Modal>
      </section>

    );
  }
;

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes).isRequired,
  setModalActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}
