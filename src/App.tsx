import React from 'react';
import app from './App.module.css';
import AppHeader from "./components/appHeader/AppHeader";
import BurgerIngredients from "./components/burgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/burgerConstructor/BurgerConstructor";


function App() {
  return (
    <div className={app.appContent}>
      <AppHeader />
        <main className={app.main}>
        <BurgerIngredients />
        <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
