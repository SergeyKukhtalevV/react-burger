import React from 'react';
import app from './App.module.css';
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";


function App() {
  return (
    <div className={app.appContent}>
      <AppHeader />
        <main className={app.main}>
        <BurgerIngredients />
        </main>
    </div>
  );
}

export default App;
