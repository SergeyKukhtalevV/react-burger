import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from '../../utils/data';
import selectedBurgerElements from "../../utils/selected-burger-elements";

function App() {
  const [burgerIngr, setburgerIngr] = React.useState({});
  const [bunBurger, setBunBurger] = React.useState({});

  //console.log(burgerIngr);
  return (
    <div className={appStyles.appContent}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients data={data} setter={setburgerIngr}/>
        <BurgerConstructor data={selectedBurgerElements} bunBurger={bunBurger} setBunBurger={setBunBurger}/>
      </main>
    </div>
  );
}

export default App;
