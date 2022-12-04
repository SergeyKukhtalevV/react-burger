import React from 'react';
import app from './App.module.css';
import AppHeader from "./components/appHeader/AppHeader";
import BurgerIngredients from "./components/burgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/burgerConstructor/BurgerConstructor";
import data from './utils/data';

function App() {
  return (
    <div className={app.appContent}>
      <AppHeader/>
      <main className={app.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
