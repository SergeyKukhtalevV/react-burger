import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import order from "../../utils/order";

const urlApi = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {

  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);

  const [orderNumber, setOrderNumber] = useState(142536);

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
    fetch(urlApi)
      .then(res => res.json())
      .then(data => setState({...state, ingredientsData: data.data, loading: false}))
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
            <BurgerConstructor data={order} isActive={modalOrderActive} orderNumber={orderNumber}
                               setModalActive={setModalOrderActive}/>
          </main>
      }

    </div>
  );
}

export default App;
