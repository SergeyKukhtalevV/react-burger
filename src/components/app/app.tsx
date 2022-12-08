import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from '../../utils/data';
import order from "../../utils/order";

const urlApi = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {

  const [state, setState] = useState({
    ingredientsData: null,
    loading: true
  })

  useEffect(() => {
    const getIngredientsData = async () => {
      setState({...state, loading: true});
      const res = await fetch(urlApi);
      const data = await res.json();
      setState({ingredientsData: data.data, loading: false});
    }

    getIngredientsData();
  },[]);

  console.log(state.ingredientsData);
  return (
    <div className={appStyles.appContent}>
      <AppHeader/>
      
      <main className={appStyles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={order} />
      </main>
    </div>
  );
}

export default App;
