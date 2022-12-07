import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from '../../utils/data';
import order from "../../utils/order";

function App() {
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
