import React, {useCallback, useEffect, FC, SyntheticEvent} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerTabs from "../burger-tabs/burger-tabs";
import BurgerElement from "../burger-element/burger-element";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import {useDispatch, useSelector} from '../../services/hooks';
import {
  setCurrentTab,
  getIngredients,
  setCurrentIngredientAction,
  removeCurrentIngredientAction
} from '../../services/actions/ingredients';
import {useLocation, useNavigate} from "react-router-dom";
import {TIngredient} from "../../services/types/ingredientTypes";

type TBurgerIngredients = {
  isActive: boolean;
  setModalActive: (arg: boolean) => void
}

const BurgerIngredients: FC<TBurgerIngredients> = ({isActive, setModalActive}) => {
    const {
      ingredientsData,
      dataRequest,
      dataFailed,
      currentIngredient,
      tabsNames,
      currentTab
    } = useSelector(store => store.ingredients);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '';

    useEffect(
      () => {
        if (fromPage === '') {
          dispatch(getIngredients());
        }
      },
      // eslint-disable-next-line
      []
    );

    useEffect(() => {
      if (!isActive) {
        setTimeout(() => {
          dispatch(removeCurrentIngredientAction());
        }, 500);
      }
    }, [dispatch, isActive]);

    const handleScroll = (event: SyntheticEvent<Element, Event> & { target: Element; }) => {
      const j = tabsNames.map((item: any, index: number) => {
        return (event.target.childNodes[index] as Element).getBoundingClientRect().top - event.target.getBoundingClientRect().top;
      }).findIndex((element: number) => {
        return element >= 0
      });
      if (j >= 0) {
        if (currentTab !== tabsNames[j].name) {
          dispatch(setCurrentTab(tabsNames[j].name));
        }
      }
    }

    const setCurrentIngredient = useCallback((id: string) => {
      setModalActive(true);
      dispatch(setCurrentIngredientAction(id));
      navigate(`/ingredients/${id}`, {state: {from: location}});
    }, [dispatch, navigate, setModalActive, location]);


  return (
      <section>
        <h1 className={`mt-10 text text_type_main-large ${burgerIngredientsStyles.title}`}>Соберите бургер</h1>
        <BurgerTabs/>
        {
          dataRequest && !dataFailed
            ? <p className="text text_type_main-medium">Идет загрузка...</p>
            :
            <ul className={`mt-10 ${burgerIngredientsStyles.ingredients}`}
              // @ts-ignore
              onScroll={handleScroll}>
              {
                tabsNames.map((type: any) => {
                  return (
                    <li className={`${burgerIngredientsStyles.elements}`} key={type.id}>
                      <p className={`text text_type_main-medium ${burgerIngredientsStyles.subtitle}`}>
                        {type.name}
                      </p>
                      <ul className={`mt-6 mb-10 ${burgerIngredientsStyles.cards}`}>
                        {
                          ingredientsData.map((info: TIngredient) => {
                            if (type.type === info.type) {
                              return (
                                <BurgerElement props={info} key={info._id}
                                               setCurrIngr={setCurrentIngredient}/>
                              )
                            }
                            return null;
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
