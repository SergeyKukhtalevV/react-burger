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
  getIngredientsInConstructor,
  getOrderNumber, REMOVE_BUN_FROM_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN_IN_CONSTRUCTOR,
  SET_INGREDIENT_IN_CONSTRUCTOR
} from "../../services/actions/ingredients";
import {useDrop} from "react-dnd";

const urlOrder = `${URL_API}/orders`;

const BurgerConstructor = ({setModalActive, isActive}) => {
    /////
    const {ingredientsData, ingredientsConstructor, dataRequest, dataFailed, orderNumber, orderNumberRequest} =
      useSelector(store => store.ingredients);

    const [{isHover}, drop] = useDrop({
      accept: "ingredient",
      collect: monitor => ({
        isHover: monitor.isOver(),
      }),
      drop(item) {
        const elem = ingredientsData.filter(ingr => ingr._id === item.id)[0];
        //console.log(elem);
        //console.log(ingredientsData.filter(i => i._id === item.id)[0].__v); // 60d3b41abdacab0026a733c7
        if (elem.type !== 'bun') {
          dispatch({
            type: SET_INGREDIENT_IN_CONSTRUCTOR,
            id: item.id
          })
        }
        else {
          console.log(elem);
          dispatch({
            type: REMOVE_BUN_FROM_CONSTRUCTOR,
            id: item.id,
            ingr: elem.type
          });
          console.log(ingredientsData.filter(i => i._id === item.id)[0]);
          dispatch({
            type: SET_BUN_IN_CONSTRUCTOR,
            id: item.id,
            ingr: elem.type
          });
        }
        // console.log(ingredientsConstructor);
        console.log(ingredientsData.filter(i => i._id === item.id)[0]);

      },
    });
    const dispatch = useDispatch();

    const handleRemoveIngredient = (id, index) => {
      const elem = ingredientsData.filter(ingr => ingr._id === id)[0];
      console.log(elem);
      elem.type !== 'bun'
      ? dispatch({
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        id,
        index
      })
        : dispatch({
          type: REMOVE_BUN_FROM_CONSTRUCTOR,
          ingr: 'bun'
        })
      //console.log(ingredientsConstructor);
    }

    useEffect(() => {
      const bun = ingredientsConstructor.filter(info => info.type === 'bun');
    }, []);


    const getOrder = () => {
      dispatch(getOrderNumber(ingredientsData.map(ingredient => ingredient._id)));
    }
///////////////////////////////
    return (
      <section className={`mt-25 ${burgerConstructorStyles.burgerConstructor}`} ref={drop}>
        {
          ingredientsConstructor.length === 0
            ? <p className="text text_type_main-medium">Конструктор бургера пуст. Создайте свой бургер!</p>
            : <div>
              <div className={`mr-4 mb-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
                <ConstructorElement {...ingredientsConstructor.filter(info => info.type === 'bun')[0]}
                                    text={ingredientsConstructor.filter(info => info.type === 'bun')[0].name + '(верх)'}
                                    thumbnail={ingredientsConstructor.filter(info => info.type === 'bun')[0].image}
                                    type={'top'}
                                    isLocked={true}/>
              </div>
              <ul className={`ml-4 mr-4 ${burgerConstructorStyles.ingredients}`}>
                {
                  ingredientsConstructor.map((info, index) => {
                    if (info.type !== 'bun') {
                      return (
                        <li className={`mr-2 ${burgerConstructorStyles.cell}`} key={info._id + index}>
                          <DragIcon type="primary"/>
                          <ConstructorElement {...info} text={info.name} thumbnail={info.image}
                                              handleClose={() => {
                                                handleRemoveIngredient(info._id, index)
                                              }}/>

                        </li>
                      )
                    }
                  })
                }
              </ul>
              <div className={`mr-4 mt-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
                <ConstructorElement {...ingredientsConstructor.filter(info => info.type === 'bun')[0]}
                                    text={ingredientsConstructor.filter(info => info.type === 'bun')[0].name + '(низ)'}
                                    thumbnail={ingredientsConstructor.filter(info => info.type === 'bun')[0].image}
                                    type={'bottom'}
                                    isLocked={true}/>

              </div>
              <div className={`mt-10 ${burgerConstructorStyles.total}`}>
                <div className={`text text_type_main-large ${burgerConstructorStyles.price}`}>
                  <p className="text text_type_digits-medium">{ingredientsData.reduce((total, i) => {
                      if (i.type !== 'bun') {
                        return total + i.price
                      } else return total
                    },
                    ingredientsConstructor.filter(info => info.type === 'bun').price * 2)}
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
