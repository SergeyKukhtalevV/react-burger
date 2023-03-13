import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {
  addIngredient,
  getOrderNumber
} from "../../services/actions/ingredients";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import ElementConstructor from "../element-constructor/element-constructor";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../../utils/utils";
import {getUserInfo} from "../../services/actions/user";


const BurgerConstructor = ({setModalActive, isActive}) => {
    const token = getCookie('token');
    const navigate = useNavigate();
    const {ingredientsData, ingredientsConstructor, orderNumber, orderNumberRequest} =
      useSelector(store => store.ingredients);
    const {accessToken} = useSelector(store => store.user);
    const [{isHover}, drop] = useDrop({
      accept: "ingredient",
      collect: monitor => ({
        isHover: monitor.isOver(),
      }),
      drop(item) {
        const elem = ingredientsData.filter(ingr => ingr._id === item.id)[0];
        dispatch(addIngredient(elem.type, elem._id, uuidv4()));
      },
    });
    const dispatch = useDispatch();

    const getBunInConstructor = () => {
      return ingredientsConstructor.filter(info => info.type === 'bun')[0];
    }

    const getOrder = () => {
      if (accessToken) {
        dispatch(getOrderNumber(accessToken, ingredientsConstructor));
        setModalActive(true);
      } else {
        navigate('/login');
      }
    }
    let total = 0;
    const getTotalOrder = useCallback(() => {
      total = ingredientsConstructor.reduce((total, i) => {
          if (!orderNumberRequest) {
            if (i.type !== 'bun') {
              return total + i.price;
            } else return total + i.price * 2;
          }
        },
        0
      )
      return total;
    }, [ingredientsConstructor]);

    useEffect(() => {
      // if (!token) {
      //   navigate('/login');
      // }
      dispatch(getUserInfo({accessToken}));

    }, [accessToken, token]);

    return (
      <section className={`mt-25 ${burgerConstructorStyles.burgerConstructor}`} ref={drop}>
        {
          ingredientsConstructor.length === 0
            ? <p className="text text_type_main-medium">Конструктор пуст. Создайте свой бургер!</p>
            : <div>
              <div className={`mr-4 mb-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
                {!getBunInConstructor()
                  ? <div></div>
                  : <ConstructorElement {...getBunInConstructor()}
                                        text={getBunInConstructor().name + '(верх)'}
                                        thumbnail={getBunInConstructor().image}
                                        type={'top'}
                                        isLocked={true}/>
                }
              </div>
              <ul className={`ml-4 mr-4 ${burgerConstructorStyles.ingredients}`}>
                {
                  ingredientsConstructor.map((info, index) => {
                    if (info.type !== 'bun') {
                      return (
                        <ElementConstructor key={info.uuid} info={info} index={index}/>
                      )
                    }
                  })
                }
              </ul>
              <div className={`mr-4 mt-4 ${burgerConstructorStyles.cell} ${burgerConstructorStyles.cell_no_scroll}`}>
                {
                  !getBunInConstructor()
                    ? <div></div>
                    : <ConstructorElement {...getBunInConstructor()}
                                          text={getBunInConstructor().name + '(низ)'}
                                          thumbnail={getBunInConstructor().image}
                                          type={'bottom'}
                                          isLocked={true}/>
                }
              </div>

              <div className={`mt-10 ${burgerConstructorStyles.total}`}>
                <div className={`text text_type_main-large ${burgerConstructorStyles.price}`}>
                  <p className="text text_type_digits-medium">{
                    getTotalOrder()}
                  </p>
                  <CurrencyIcon type="primary"/>
                </div>
                {
                  !getBunInConstructor()
                    ? <div></div>
                    : <Button htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4 buttonOrder"
                              onClick={() => {
                                getOrder();
                              }}>Оформить заказ
                    </Button>
                }
              </div>
              {
                !getBunInConstructor()
                  ? <p className="text text_type_main-medium">Для оформления заказа нужно добавить булку!</p>
                  : <div></div>
              }
            </div>
        }
        <Modal active={isActive} setActive={setModalActive}>
          <OrderDetails orderNum={orderNumber}/>
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
