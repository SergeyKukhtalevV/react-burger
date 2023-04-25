import React, {FC, useCallback, useEffect} from 'react';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/OrderDetails";
import {useDispatch, useSelector} from '../../services/hooks';
import {addIngredient, getOrderNumber} from "../../services/actions";
import {useDrop} from "react-dnd";

// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import ElementConstructor from "../element-constructor/element-constructor";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../../utils/utils";
import {getUserInfo} from "../../services/actions";
import {TIngredient} from "../../services/types/ingredientTypes";
import {TFCWithModal} from "../../services/types/data";

const BurgerConstructor: FC<TFCWithModal> = ({setModalActive, isActive}) => {
    const token = getCookie('token');
    const navigate = useNavigate();
    const {
      ingredientsData,
      ingredientsConstructor,
      orderNumber,
      orderNumberRequest
    } = useSelector(store => store.ingredients);
    const {accessToken} = useSelector(store => store.user);
    // eslint-disable-next-line
    const [{isHover}, drop] = useDrop({
      accept: "ingredient",
      collect: monitor => ({
        isHover: monitor.isOver(),
      }),
      drop(item: any) {
        const elem: TIngredient = ingredientsData.filter((ingr: TIngredient) => ingr._id === item.id)[0];
        dispatch(addIngredient(elem._id, uuidv4(), elem.type));
      },
    });
    const dispatch = useDispatch();

    const getBunInConstructor = (): TIngredient => {
      return ingredientsConstructor.filter((info: TIngredient) => info.type === 'bun')[0];
    }

    const getOrder = () => {
      if (accessToken) {
        const data: TIngredient[] = [[...ingredientsConstructor]
          .filter(info => info.type === 'bun')[0],
          ...ingredientsConstructor.filter((info: TIngredient) => info.type !== 'bun'),
          [...ingredientsConstructor].filter((info: TIngredient) => info.type === 'bun')[0]];

        dispatch(getOrderNumber(accessToken, data.map(ingredient => ingredient._id)));
        setModalActive(true);
      } else {
        navigate('/login');
      }
    }
    const getTotalOrder = useCallback((): number => {
      // eslint-disable-next-line
      return ingredientsConstructor.reduce((total: any, item) => {
          if (!orderNumberRequest) {
            if (item.type !== 'bun') {
              return total + item.price;
            } else return total + item.price * 2;
          }
        },
        0
      )
    }, [ingredientsConstructor]);

    useEffect(() => {
      if (token) {
        dispatch(getUserInfo({accessToken}));
      }

    }, [accessToken, token, dispatch]);

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
                  ingredientsConstructor.map((info: TIngredient, index: number) => {
                    if (info.type !== 'bun') {
                      return (
                        <ElementConstructor key={info.uuid} info={info} index={index}/>
                      )
                    }
                    return null;
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
