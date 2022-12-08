import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import order from "../../utils/order";

const urlApi = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {

  const [state, setState] = useState({
    ingredientsData: [],
    loading: true
  });

  useEffect(() => {
    getIngredientsData();
  },[]);

  const getIngredientsData = async () => {
    setState({...state, loading: true});
    const res = await fetch(urlApi);
    const data = await res.json();
    setState({ingredientsData: data.data, loading: false});
  }

  return (
    <div className={appStyles.appContent}>
      <AppHeader/>
      {
        state.loading
        ? <p className="text text_type_main-medium">Идет загрузка...</p>
      :
        <main className={appStyles.main}>
          <BurgerIngredients data={state.ingredientsData} />
          <BurgerConstructor data={order} />
        </main>
      }
    </div>
  );
}

export default App;
