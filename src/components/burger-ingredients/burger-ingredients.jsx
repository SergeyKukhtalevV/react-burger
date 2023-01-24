import React, {useEffect} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerTabs from "../burger-tabs/burger-tabs";
import BurgerElement from "../burger-element/burger-element";
import PropTypes from "prop-types";
import {burgerPropTypes} from '../../utils/proptypes-validate';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients, REMOVE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT} from '../../services/actions/ingredients';


const BurgerIngredients = ({isActive, setModalActive}) => {

  const {ingredientsData, dataRequest, dataFailed, currentIngredient, tabsNames, currentTab} = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );
  let i = 0;
  const handleScroll = (e) => {
    console.log(e.target.childNodes[i].getBoundingClientRect().top >= 0 ? 'Булки' : i < 2 ? 'Соусы' : 'Начинки');
    if(e.target.childNodes[i].getBoundingClientRect().top < 0) i++;
    if(i>2) i = 0;
    //TOGO вызов переключения активной вкладки таба + увеличение индекса потомка
  }
// useEffect(() => {
//   document.addEventListener('scroll', (e) => {
//     console.log(document.getElementById('burgerIngredients').offsetTop);
//   });
  //console.log(document.getElementById('burgerIngredients').offsetTop);
// }, []);

  const [ingredientsInfo, setIngredientsInfo] = React.useState({});

  const [ingredientsTypes, setIngredients] = React.useState([
    {id: 1, name: 'Булки', type: 'bun'},
    {id: 2, name: 'Соусы', type: 'sauce'},
    {id: 3, name: 'Начинка', type: 'main'}
  ]);

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
      <BurgerTabs currentActiveTab={currentTab}/>
      {
        dataRequest && !dataFailed
          ? <p className="text text_type_main-medium">Идет загрузка...</p>
          : <ul className={`mt-10 ${burgerIngredientsStyles.ingredients}`} id={"burgerIngredients"} onScroll={handleScroll}>
            {
              tabsNames.map(type => {
                return (
                  <li className={`${burgerIngredientsStyles.elements}`} key={type.id}>
                    <p className={`text text_type_main-medium ${burgerIngredientsStyles.subtitle}`} >
                      {type.name}
                    </p>
                    <ul className={`mt-6 mb-10 ${burgerIngredientsStyles.cards}`}>
                      {
                        ingredientsData.map(info => {
                          if (type.type === info.type) {
                            return (
                              <BurgerElement props={info} key={info._id}
                                             setCurrIngr={setCurrentIngredient} />
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
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
}
