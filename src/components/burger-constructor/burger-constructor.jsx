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
  getIngredientsInConstructor, getOrderNumber, SET_INGREDIENT_IN_CONSTRUCTOR
} from "../../services/actions/ingredients";
import {useDrop} from "react-dnd";

const urlOrder = `${URL_API}/orders`;

const BurgerConstructor = ({setModalActive, isActive}) => {
    /////
    const {ingredientsData, ingredientsConstructor, dataRequest, dataFailed, orderNumber, orderNumberRequest} =
      useSelector(store => store.ingredients);

    const [{ isHover } , drop] = useDrop({
      accept: "ingredient",
      collect: monitor => ({
        isHover: monitor.isOver(),
      }),
      drop(item) {
        dispatch({
          type: SET_INGREDIENT_IN_CONSTRUCTOR,
          id: item.id
        });
      },
    });
    const dispatch = useDispatch();

    // useEffect(
    //   () => {
    //     dispatch({type: SET_INGREDIENT_IN_CONSTRUCTOR, id: '60d3b41abdacab0026a733d4'});
    //     console.log(ingredientsConstructor);
    //   },
    //   [dispatch]
    // );

    const bun = ingredientsData.filter(info => {
      if (info.type === 'bun') {
        return info;
      }
    });

    const getOrder = () => {
      dispatch(getOrderNumber(ingredientsData.map(ingredient => ingredient._id)));
    }
///////////////////////////////
    return (
      <section className={`mt-25 ${burgerConstructorStyles.burgerConstructor}`} ref={drop} >
        {
          ingredientsConstructor.length === 0
            ? <p className="text text_type_main-medium">Конструктор бургера пуст. Создайте свой бургер!</p>
            : <div>
              <div className={`mr-4 mb-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
                <ConstructorElement {...bun[0]} text={bun[0].name + '(верх)'} thumbnail={bun[0].image} type={'top'}
                                    isLocked={true}/>
              </div>
              <ul className={`ml-4 mr-4 ${burgerConstructorStyles.ingredients}`}>
                {
                  ingredientsConstructor.map((info, index) => {
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
