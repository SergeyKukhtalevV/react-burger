import React, {useState, useEffect, useContext} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import order from "../../utils/order";
import {BurgerContext} from "../../services/burgerContext";
import {urlApi} from '../../constants/constants';

const urlData = `${urlApi}/ingredients`;

function App() {

  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);
  const [state, setState] = useState({
    ingredientsData: [],
    loading: true,
    error: ''
  });

  useEffect(() => {
    getIngredientsData();
  }, []);

  const getIngredientsData = async () => {
    setState({...state, loading: true});
    fetch(urlData)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
        setState({...state, ingredientsData: data.data, loading: false});
      })
      .catch(e => {
        setState({...state, error: e.message, loading: false});
      });
  };

  return (
    <div className={appStyles.appContent}>
      <AppHeader/>
      {
        state.loading
          ? <p className="text text_type_main-medium">Идет загрузка...</p>
          :
          <main className={appStyles.main}>
            <BurgerIngredients data={state.ingredientsData} isActive={modalIngredientActive}
                               setModalActive={setModalIngredientActive}/>
            <BurgerContext.Provider value={state}>
              <BurgerConstructor data={order} isActive={modalOrderActive} setModalActive={setModalOrderActive}/>
            </BurgerContext.Provider>
          </main>
      }

    </div>
  );
}

export default App;
