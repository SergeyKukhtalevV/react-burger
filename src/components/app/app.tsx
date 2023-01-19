import React, { useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);
  return (
    <div className={appStyles.appContent}>
      <AppHeader/>
      {
          <main className={appStyles.main}>
            <BurgerIngredients isActive={modalIngredientActive}
                               setModalActive={setModalIngredientActive}/>
              <BurgerConstructor isActive={modalOrderActive} setModalActive={setModalOrderActive}/>
          </main>
      }
    </div>
  );
}

export default App;
