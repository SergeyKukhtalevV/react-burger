import React, {useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {DndProvider} from "react-dnd";

function App() {
  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
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
        </div>} />
        <Route path="/login" element={<h1> login </h1>} />
        <Route path="/register" element={<h1> register </h1>} />
        <Route path="/forgot-password" element={<h1> forgot-password </h1>} />
        <Route path="/reset-password" element={<h1> reset-password </h1>} />
        <Route path="/profile" element={<h1> profile </h1>} />
        <Route path="/ingredients/:id" element={<h1> ingredients/:id </h1>} />
        <Route path="*" element={<h1> page 404 </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
