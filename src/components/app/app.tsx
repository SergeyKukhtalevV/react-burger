import React, {useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function App() {
  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);
  return (
    <div className={appStyles.appContent}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader/>
        {
          <main className={appStyles.main}>
            <BurgerIngredients isActive={modalIngredientActive}
                               setModalActive={setModalIngredientActive}/>
            <BurgerConstructor isActive={modalOrderActive} setModalActive={setModalOrderActive}/>
          </main>
        }
      </DndProvider>
    </div>
  );
}

export default App;
