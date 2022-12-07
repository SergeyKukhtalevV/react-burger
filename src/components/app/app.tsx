import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from '../../utils/data';

function App() {
  const [bunBurger, setBunBurger] = React.useState({});

  return (
    <div className={appStyles.appContent}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients data={data} setter={setBunBurger}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
