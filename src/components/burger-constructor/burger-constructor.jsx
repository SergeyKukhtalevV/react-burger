import React, {useContext, useReducer, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerPropTypes} from '../../utils/proptypes-validate';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/OrderDetails";
import {URL_API} from '../../constants/constants';
import {useDispatch, useSelector} from "react-redux";
import {
  GET_INGREDIENTS_CONSTRUCTOR,
  getIngredients,
  getIngredientsInConstructor
} from "../../services/actions/ingredients";

const urlOrder = `${URL_API}/orders`;

const BurgerConstructor = ({setModalActive, isActive}) => {
    /////
    const {ingredientsData, ingredientsConstructor, dataRequest, dataFailed} = useSelector(store => store.ingredients);
    // if (ingredientsData.length === 0) {
    //   console.log('БургерКонструктор пуст');
    // } else {
    //   console.log('Данные пришли');
    // }

    // const dispatch = useDispatch();
    //
    // useEffect(
    //   () => {
    //     dispatch({type: GET_INGREDIENTS_CONSTRUCTOR});
    //     console.log(ingredientsConstructor);
    //   },
    //   []
    // );


    const [orderNumber, setOrderNumber] = useState(null);

    const bun = ingredientsData.filter(info => {
      if (info.type === 'bun') {
        return info;
      }
    });
    const [orderInfo, setOrderInfo] = useState({
      ingredientsID: ingredientsData.map(ingredient => ingredient._id),
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
        {
          ingredientsData.length === 0
            ? <p className="text text_type_main-medium">Конструктор бургера пуст. Создайте свой бургер!</p>
            : <div>
              <div className={`mr-4 mb-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
                <ConstructorElement {...bun[0]} text={bun[0].name + '(верх)'} thumbnail={bun[0].image} type={'top'}
                                    isLocked={true}/>
              </div>
              <ul className={`ml-4 mr-4 ${burgerConstructorStyles.ingredients}`}>
                {
                  ingredientsData.map((info, index) => {
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
                  <p className="text text_type_digits-medium">{ingredientsData.reduce((total, i) => {
                    if (i.type !== 'bun') {
                      return total + i.price
                    } else return total
                  },
                    bun[0].price * 2)}
                  </p>
                  <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4 buttonOrder" onClick={() => {
                  getOrder();
                  setModalActive(true);
                }}>
                  Оформить заказ
                </Button>

              </div>
            </div>
        }

        <Modal active={isActive} setActive={setModalActive}>
          <OrderDetails orderNum={orderNumber ? orderNumber : 'Loading...'}/>
        </Modal>
      </section>

    );
  }
;

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  setModalActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}
