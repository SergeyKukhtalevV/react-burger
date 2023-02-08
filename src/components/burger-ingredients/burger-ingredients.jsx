import React, {useEffect} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerTabs from "../burger-tabs/burger-tabs";
import BurgerElement from "../burger-element/burger-element";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import {useDispatch, useSelector} from 'react-redux';
import {
  setCurrentTab,
  getIngredients,
  SET_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT
} from '../../services/actions/ingredients';


const BurgerIngredients = ({isActive, setModalActive}) => {

    const {
      ingredientsData,
      dataRequest,
      dataFailed,
      currentIngredient,
      tabsNames,
      currentTab
    } = useSelector(store => store.ingredients);
    const dispatch = useDispatch();

    useEffect(
      () => {
        dispatch(getIngredients());
      },
      [dispatch]
    );

    useEffect(() => {
      if (!isActive) {
        dispatch({
          type: REMOVE_CURRENT_INGREDIENT
        });
      }
    }, [isActive]);

    const [ingredientsTypes, setIngredients] = React.useState([
      {id: 1, name: 'Булки', type: 'bun'},
      {id: 2, name: 'Соусы', type: 'sauce'},
      {id: 3, name: 'Начинки', type: 'main'}
    ]);

    let i = 0;
    const handleScroll = (e) => {
      if (e.target.childNodes[i].getBoundingClientRect().bottom >= 0) {
        if (currentTab !== ingredientsTypes[i].name) {
          dispatch(setCurrentTab(ingredientsTypes[i].name));
        }
      } else i++;
    }

    const setCurrentIngredient = (id) => {
      setModalActive(true);
      dispatch({
        type: SET_CURRENT_INGREDIENT,
        id
      });
    }

    return (
      <section>
        <h1 className={`mt-10 text text_type_main-large ${burgerIngredientsStyles.title}`}>Соберите бургер</h1>
        <BurgerTabs/>
        {
          dataRequest && !dataFailed
            ? <p className="text text_type_main-medium">Идет загрузка...</p>
            :
            <ul className={`mt-10 ${burgerIngredientsStyles.ingredients}`} onScroll={handleScroll}>
              {
                tabsNames.map(type => {
                  return (
                    <li className={`${burgerIngredientsStyles.elements}`} key={type.id}>
                      <p className={`text text_type_main-medium ${burgerIngredientsStyles.subtitle}`}>
                        {type.name}
                      </p>
                      <ul className={`mt-6 mb-10 ${burgerIngredientsStyles.cards}`}>
                        {
                          ingredientsData.map(info => {
                            if (type.type === info.type) {
                              return (
                                <BurgerElement props={info} key={info._id}
                                               setCurrIngr={setCurrentIngredient}/>
                              )
                            }
                          })
                        }
                      </ul>
                    </li>
                  )
                })
              }
            </ul>
        }
        <Modal active={isActive} setActive={setModalActive}>
          <IngredientDetails info={currentIngredient}/>
        </Modal>
      </section>
    );
  }
;

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
}
